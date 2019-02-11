import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'

const ListNavigator = createBottomTabNavigator({
  events: {
    screen: EventListScreen,
  },
  people: {
    screen: PeopleListScreen,
  },
})

const StackNavigator = createStackNavigator({
  auth: {
    screen: AuthScreen,
  },
  lists: {
    screen: ListNavigator,
  },
  event: {
    screen: EventScreen,
  },
})

export default createAppContainer(StackNavigator)