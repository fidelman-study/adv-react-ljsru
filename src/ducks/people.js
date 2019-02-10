import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import {
  put,
  takeEvery,
  call,
  all,
  delay,
  fork,
  cancel
} from 'redux-saga/effects'
import { fbToEntities } from '../services/utils'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 */
const PersonRecord = Record({
  id: null,
  email: null,
  firstName: null,
  lastName: null
})

const ReducerState = Record({
  entities: new OrderedMap({})
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.setIn(['entities', payload.id], new PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.id])

    default:
      return state
  }
}

/**
 * Selector
 */
export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id
export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.getIn(['entities', id])
)
export const peopleByIdsSelector = (state, ids) =>
  ids.map((id) => stateSelector(state).getIn(['entities', id])).filter(Boolean)

/**
 * Action Creator
 */
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function fetchAllPeople() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { id }
  }
}

/**
 * Sagas
 */
export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START,
    payload: { ...action.payload.person }
  })

  yield call(api.addPerson, action.payload.person)

  yield put(reset('person'))
}

export function* fetchAllSaga() {
  try {
    const data = yield call(api.loadAllPeople)

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data
    })
  } catch (_) {}
}

export function* deletePersonSaga({ payload }) {
  try {
    yield call(api.deletePerson, payload.id)
    yield put({
      type: DELETE_PERSON_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* syncPeopleWithPolling() {
  while (true) {
    yield call(fetchAllSaga)
    yield delay(20000)
  }
}

export function* cancellableSyncSaga() {
  const syncProcess = yield fork(syncPeopleWithPolling)
  yield delay(5000)
  yield cancel(syncProcess)
}

export function* saga() {
  yield fork(cancellableSyncSaga)
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga),
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
  ])
}
