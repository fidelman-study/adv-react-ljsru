import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_FAIL = `${prefix}/SIGN_IN_FAIL`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_FAIL = `${prefix}/SIGN_UP_FAIL`

/**
 * Reducer
 */
export const ReducerRecord = Record({
  loading: false,
  user: null,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user).set('loading', false)

    case SIGN_IN_START:
    case SIGN_UP_START:
      return state.set('loading', true)

    case SIGN_IN_FAIL:
    case SIGN_UP_FAIL:
      return state.set('error', payload.error).set('loading', false)

    default:
      return state
  }
}

/**
 * Init Logic
 */
api.onAuthStateChanged((user) => {
  window.store &&
    window.store.dispatch({ type: SIGN_IN_SUCCESS, payload: { user } })
})

/**
 * Selectors
 */
export const userSelector = (state) => state[moduleName].user
export const loadingSelector = (state) => state[moduleName].loading
export const errorSelector = (state) => state[moduleName].error
export const isAithorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)

/**
 * Action Creators
 */
export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

/**
 * Sagas
 */
export function* signInSaga({ email, password }) {
  yield put({ type: SIGN_IN_START })
  try {
    const user = yield call(api.signIn, email, password)
    yield put({ type: SIGN_IN_SUCCESS, payload: { user } })
  } catch (error) {
    yield put({ type: SIGN_IN_FAIL, payload: { error } })
  }
}

export function* signUpSaga({ payload: { email, password } }) {
  const loading = yield select(loadingSelector)
  if (loading) return

  yield put({ type: SIGN_UP_START })
  try {
    const user = yield call(api.signUp, email, password)
    yield put({ type: SIGN_UP_SUCCESS, payload: { user } })
  } catch (error) {
    yield put({ type: SIGN_UP_FAIL, payload: { error } })
  }
}

export function* saga() {
  yield all([
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(SIGN_UP_REQUEST, signUpSaga)
  ])
}
