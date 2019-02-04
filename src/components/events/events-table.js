import React from 'react'
import { connect } from 'react-redux'
import Loader from '../common/loader'
import {
  eventsSelector,
  loadingSelector,
  loadedSelector,
  fetchAllEvents
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

  getRows = () => this.props.events.map(this.getRow)

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
    events: eventsSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    fetchAllEvents
  }
)(EventsTable)
