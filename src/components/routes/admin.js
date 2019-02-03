import React from 'react'
import { connect } from 'react-redux'
import AddPersonForm from '../admin/add-person-form'
import { addPerson } from '../../ducks/people'

class AdminPage extends React.Component {
    handleAddPerson = ({ email, firstName, lastName }) => {
        this.props.addPerson({ email, firstName, lastName });
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <AddPersonForm onSubmit={this.handleAddPerson} />
            </div>
        )
    }
}

export default connect(null, {
    addPerson
})(AdminPage)