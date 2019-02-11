import React, { Component } from 'react'
import Event from '../events/event'
import { events } from '../../fixtures'

const eventList = Object.entries(events).map(([id, event]) => ({ id, ...event }))

export default class EventScreen extends Component {
  render() {
    return <Event event={eventList[0]} />
  }
}
