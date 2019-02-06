import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call } from 'redux-saga/effects'
import { generateId } from '../services/utils'

/**
 * Constants
 */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`

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
  entities: new List([
    new PersonRecord({
      id: 1,
      firstName: 'Andrei',
      lastName: 'Fidelman',
      email: 'asdasd@sadads.cz'
    }),
    new PersonRecord({
      id: 2,
      firstName: 'Karina',
      lastName: 'Anisimova',
      email: 'asd213asd@sadads.com'
    })
  ])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )

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

/**
 * Action Creator
 */
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

/**
 * Sagas
 */
export function* addPersonSaga(action) {
  const { person } = action.payload
  const id = yield call(generateId)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: {
      person: { id, ...person }
    }
  })

  yield put(reset('person'))
}

export function* saga() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}
