import React from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDndPreview extends React.Component {
  render() {
    const { person } = this.props
    return <div>{person.email}</div>
  }
}

export default connect((state, ownProps) => ({
  person: personSelector(state, ownProps)
}))(PersonDndPreview)
