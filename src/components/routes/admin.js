import React from 'react'
import AddPersonForm from '../admin/add-person-form'

class AdminPage extends React.Component {
    handleAddPerson = ({ email, firstName, lastName }) => {
        console.log(email, firstName, lastName);
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

export default AdminPage