import { put, call } from 'redux-saga/effects'
import { addPersonSaga, addPerson, ADD_PERSON_START } from './people'
import { reset } from 'redux-form'
import { generateId } from '../services/utils'

describe('People Duck', () => {
  it('should add person', () => {
    const person = {
      firstName: 'Andrei',
      lastName: 'Fidelman',
      email: 'asdasd@asdasd.cz'
    }
    const action = addPerson(person)
    const addPersonProcess = addPersonSaga(action)

    expect(addPersonProcess.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(addPersonProcess.next(id).value).toEqual(
      put({
        type: ADD_PERSON_START,
        payload: {
          person: { id, ...person }
        }
      })
    )

    expect(addPersonProcess.next().value).toEqual(put(reset('person')))
    expect(addPersonProcess.next().done).toEqual(true)
  })
})
