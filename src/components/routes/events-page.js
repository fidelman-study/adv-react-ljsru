import React from 'react'
import EventsTable from '../events/virtualized-lazy-table'
import SelectedEvents from '../events/selected-events'
import PeopleList from '../people/people-list'

class EventsPage extends React.Component {
  render() {
    return (
      <div>
        <PeopleList />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
