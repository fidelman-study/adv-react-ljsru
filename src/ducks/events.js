import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_START = `${prefix}/GET_EVENTS_START`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_FAIL = `${prefix}/GET_EVENTS_FAIL`

export const TOGGLE_SELECT_REQUEST = `${prefix}/TOGGLE_SELECT_REQUEST`
export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 */

export const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export const ReducerState = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  events: new List([])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_START:
      return state.set('loading', true)

    case GET_EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .set(
          'events',
          new List(
            Object.entries(payload).map(
              ([id, value]) => new EventRecord({ id, ...value })
            )
          )
        )

    case GET_EVENTS_FAIL:
      return state.set('loading', false)

    case TOGGLE_SELECT:
      return state.update('selected', (selected) =>
        selected.has(payload.id)
          ? selected.remove(payload.id)
          : selected.add(payload.id)
      )

    default:
      return state
  }
}

/**
 * Selectors
 */
export const stateSelector = (state) => state[moduleName]
export const entriesSelector = createSelector(
  stateSelector,
  (state) => {
    return state.events
  }
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventsSelector = createSelector(
  entriesSelector,
  (entries) => {
    return entries.toArray()
  }
)
export const selectedIdsSelector = createSelector(
  stateSelector,
  (state) => state.selected
)
export const selectedEventsSelector = createSelector(
  eventsSelector,
  selectedIdsSelector,
  (entries, ids) => entries.filter((entry) => ids.has(entry.id))
)

/**
 * Action Creators
 */
export function fetchAllEvents() {
  return {
    type: GET_EVENTS_REQUEST
  }
}

export function toggleSelectedEvent(id) {
  return {
    type: TOGGLE_SELECT_REQUEST,
    payload: {
      id
    }
  }
}

/**
 * Sagas
 */

export function* fetchAllEventsSaga() {
  yield put({ type: GET_EVENTS_START })

  const data = yield call(api.fetchAllEvents)

  yield put({ type: GET_EVENTS_SUCCESS, payload: data })
}

export function* toggleSelectSaga(action) {
  const { id } = action.payload
  yield put({ type: TOGGLE_SELECT, payload: { id } })
}

export function* saga() {
  yield all([
    takeEvery(GET_EVENTS_REQUEST, fetchAllEventsSaga),
    takeEvery(TOGGLE_SELECT_REQUEST, toggleSelectSaga)
  ])
}
