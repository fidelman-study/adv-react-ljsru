import React from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import PersonCard from './person-card'

class PeopleList extends React.Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <div>
        {this.props.people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  {
    fetchAllPeople
  }
)(PeopleList)
