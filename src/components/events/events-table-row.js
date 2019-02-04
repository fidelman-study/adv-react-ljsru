import React from 'react'

class EventsTableRow extends React.Component {
  render() {
    const { url, title, where, when } = this.props.event

    return (
      <tr className="test--events-table__row">
        <td>
          <a href={url}>{title}</a>
        </td>
        <td>{where}</td>
        <td>{when}</td>
      </tr>
    )
  }
}

export default EventsTableRow
