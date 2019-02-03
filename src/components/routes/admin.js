import React from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'

class AdminPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <Route path="/auth/people" component={PersonPage} />
            </div>
        )
    }
}

export default AdminPage