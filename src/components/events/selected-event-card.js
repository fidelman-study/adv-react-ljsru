import React from 'react'

class SelectedEventCard extends React.Component {
  render() {
    const { event } = this.props

    return (
      <div style={{ width: 400, height: 150, border: '1px solid' }}>
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

export default SelectedEventCard
