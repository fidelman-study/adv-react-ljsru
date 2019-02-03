import React from 'react'
import { connect } from 'react-redux'
import NewPersonPage from '../people/new-person-form'
import PeopleList from '../people/people-list'
import { addPerson } from '../../ducks/people'

class AdminPage extends React.Component {
    handleAddPerson = ({ email, firstName, lastName }) => {
        this.props.addPerson({ email, firstName, lastName });
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <PeopleList />
                <NewPersonPage onSubmit={this.handleAddPerson} />
            </div>
        )
    }
}

export default connect(null, {
    addPerson
})(AdminPage)
