import React from 'react'

class EventsTableRow extends React.Component {
  handleClick = () => {
    const {
      event: { id },
      onClick
    } = this.props
    onClick && onClick(id)
  }

  render() {
    const {
      event: { url, title, where, when }
    } = this.props

    return (
      <tr className="test--events-table__row" onClick={this.handleClick}>
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
