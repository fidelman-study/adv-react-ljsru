import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 */
const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
})

export default function reducer(state = new ReducerState(), action) {
    const { type, payload } = action

    switch(type) {
        case ADD_PERSON_SUCCESS:
            return state.update('entities', entities =>
                entities.push(new PersonRecord(payload.person))
            )

        default:
            return state
    }
}

/**
 * Action Creator
 */
export function addPerson(person) {
    return dispatch => {
        dispatch({
            type: ADD_PERSON_SUCCESS,
            payload: {
                person: { id: Date.now(), ...person }
            }
        })

        dispatch(reset('person'))
    }
}