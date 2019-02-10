import React from 'react'
import { connect } from 'react-redux'
import NewPersonPage from '../people/new-person-form'
import PeopleList from '../people/people-list'
import { addPerson } from '../../ducks/people'

class AdminPage extends React.Component {
  handleAddPerson = ({ email, firstName, lastName }) => {
    this.props.addPerson({ email, firstName, lastName })
  }

  render() {
    return (
      <div>
        <PeopleList />
        <NewPersonPage onSubmit={this.handleAddPerson} />
      </div>
    )
  }
}

export default connect(
  null,
  {
    addPerson
  }
)(AdminPage)
