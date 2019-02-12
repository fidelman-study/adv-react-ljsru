import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'
import EventMap from './screens/event-map'
import Photo from './screens/person-photo'

const ListNavigator = createBottomTabNavigator({
  events: {
    screen: EventListScreen,
  },
  people: {
    screen: PeopleListScreen,
  },
  eventMap: {
    screen: EventMap,
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
  personPhoto: {
    screen: Photo,
  },
})

export default createAppContainer(StackNavigator)