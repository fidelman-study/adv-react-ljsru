import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import auth from '../ducks/auth'

export default combineReducers({
    router: connectRouter(history),
    auth,
})