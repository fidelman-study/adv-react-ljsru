import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import history from '../history'
import authReducer, { moduleName as authModule } from '../ducks/auth'

export default combineReducers({
    form,
    router: connectRouter(history),
    [authModule]: authReducer,
})