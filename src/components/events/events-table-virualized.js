import React from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import Loader from '../common/loader'
import {
  eventsSelector,
  loadingSelector,
  loadedSelector,
  fetchAllEvents,
  toggleSelectedEvent
} from '../../ducks/events'
import EventsTableRow from './events-table-row'
import 'react-virtualized/styles.css'

export class EventsTableVirualized extends React.Component {
  componentDidMount() {
    this.props.fetchAllEvents()
  }

  render() {
    if (this.props.loading) return <Loader />

    return (
      <Table
        rowCount={this.props.events.length}
        width={500}
        height={300}
        rowHeight={50}
        headerHeight={50}
        rowGetter={this.rowGetter}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="where" width={200} label="Where" />
        <Column dataKey="when" width={200} label="When" />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  {
    fetchAllEvents,
    selectEvent: toggleSelectedEvent
  }
)(EventsTableVirualized)
