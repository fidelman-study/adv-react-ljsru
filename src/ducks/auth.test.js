import reducer, {
  signInSaga,
  signUpSaga,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  ReducerRecord,
  loadingSelector,
  SIGN_IN_START,
  SIGN_UP_START,
  SIGN_IN_FAIL,
  SIGN_UP_FAIL
} from './auth'
import { call, put, select } from 'redux-saga/effects'
import api from '../services/api'
import { auth } from 'firebase'

/**
 * Saga tests
 */
it('sould sign up', () => {
  const authData = {
    email: 'fidelmanlife@gmail.com',
    password: '123123123'
  }

  const user = {
    email: authData.email,
    uid: Math.random.toString()
  }

  const requestAction = {
    type: SIGN_UP_REQUEST,
    payload: authData
  }

  const saga = signUpSaga(requestAction)

  expect(saga.next().value).toEqual(select(loadingSelector))
  expect(saga.next(false).value).toEqual(put({ type: SIGN_UP_START }))

  expect(saga.next().value).toEqual(
    call(api.signUp, authData.email, authData.password)
  )

  expect(saga.next(user).value).toEqual(
    put({ type: SIGN_UP_SUCCESS, payload: { user } })
  )
})

it('should not sign up while request is active', () => {
  const authData = {
    email: 'fidelmanlife@gmail.com',
    password: '123123123'
  }

  const requestAction = {
    type: SIGN_UP_REQUEST,
    payload: authData
  }

  const saga = signUpSaga(requestAction)

  expect(saga.next().value).toEqual(select(loadingSelector))
  expect(saga.next(true).done).toBe(true)
})

it('should dispatch an error on sign up', () => {
  const authData = {
    email: 'fidelmanlife@gmail.com',
    password: '123123123'
  }

  const user = {
    email: authData.email,
    uid: Math.random.toString()
  }

  const requestAction = {
    type: SIGN_UP_REQUEST,
    payload: authData
  }

  const saga = signUpSaga(requestAction)

  expect(saga.next().value).toEqual(select(loadingSelector))
  expect(saga.next(false).value).toEqual(put({ type: SIGN_UP_START }))

  expect(saga.next().value).toEqual(
    call(api.signUp, authData.email, authData.password)
  )

  const error = new Error('some err')
  expect(saga.throw(error).value).toEqual(
    put({ type: SIGN_UP_FAIL, payload: { error } })
  )
})

it('should sign in', () => {
  const authData = {
    email: 'services@actum.cz',
    password: '123123123'
  }

  const user = {
    email: 'services@actum.cz',
    uid: Math.random.toString()
  }

  const requestAction = {
    type: SIGN_IN_REQUEST,
    payload: authData
  }

  const saga = signInSaga(requestAction)

  expect(saga.next().value).toEqual(put({ type: SIGN_IN_START }))
  expect(saga.next(requestAction).value).toEqual(
    call(api.signIn, authData.email, authData.password)
  )
  expect(saga.next(user).value).toEqual(
    put({ type: SIGN_IN_SUCCESS, payload: { user } })
  )
})

/**
 * Reducer Test
 */
it('should sign in', () => {
  const state = new ReducerRecord()
  const user = {
    email: 'services@actum.cz',
    uid: Math.random.toString()
  }

  const newState = reducer(state, {
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })

  expect(newState).toEqual(new ReducerRecord({ user }))
})
