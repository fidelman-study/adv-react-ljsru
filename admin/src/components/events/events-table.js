import React from 'react'
import { connect } from 'react-redux'
import Loader from '../common/loader'
import {
  eventListSelector,
  loadingSelector,
  loadedSelector,
  fetchAllEvents,
  toggleSelectedEvent
} from '../../ducks/events'
import EventsTableRow from './events-table-row'

export class EventsTable extends React.Component {
  componentDidMount() {
    this.props.fetchAllEvents()
  }

  render() {
    if (this.props.loading) return <Loader />

    return (
      <table>
        <tbody>{this.getRows()}</tbody>
      </table>
    )
  }

  getRows = () => {
    return this.props.events.map(this.getRow)
  }

  getRow = (event) => (
    <EventsTableRow
      key={event.id}
      onClick={this.props.selectEvent}
      event={event}
    />
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    fetchAllEvents,
    selectEvent: toggleSelectedEvent
  }
)(EventsTable)
