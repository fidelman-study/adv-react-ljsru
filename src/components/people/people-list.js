import React from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'
import PersonCard from './person-card'

class PeopleList extends React.Component {
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

export default connect((state) => ({
  people: peopleSelector(state)
}))(PeopleList)
