import { appName } from '../config'
import { Record, List } from 'immutable'
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

/**
 * Reducer
 */

export const EventRecord = Record({
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

/**
 * Action Creators
 */
export function fetchAllEvents() {
  return {
    type: GET_EVENTS_REQUEST
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

export function* saga() {
  yield all([takeEvery(GET_EVENTS_REQUEST, fetchAllEventsSaga)])
}
