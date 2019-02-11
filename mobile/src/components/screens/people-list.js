import React from 'react'
import { observer, inject } from 'mobx-react'
import { View, ActivityIndicator } from 'react-native'
import PeopleList from '../people/people-list'

@inject('people')
@observer

class PeopleListScreen extends React.Component {
  static navigationOptions = {
    title: 'People List',
  }

  componentDidMount() {
    this.props.people.checkAndLoadAll()
  }

  render() {
    const {people} = this.props
    if(people.loading) return this.loader
    return <PeopleList/>
  }

  get loader() {
    return <View><ActivityIndicator size="large"/></View>
  }
}

export default PeopleListScreen