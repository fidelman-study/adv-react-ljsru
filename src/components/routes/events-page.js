import React from 'react'
import EventsTable from '../events/virtualized-lazy-table'
import SelectedEvents from '../events/selected-events'

class EventsPage extends React.Component {
  render() {
    return (
      <div>
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
