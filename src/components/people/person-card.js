import React from 'react'
import { DragSource } from 'react-dnd'

class PersonCard extends React.Component {
  render() {
    const {
      person: { email, firstName },
      connectDragSource,
      isDragging
    } = this.props

    return (
      <div style={{ opacity: isDragging ? 0.2 : 1 }}>
        {connectDragSource(<h3>{firstName}</h3>)}
        <h5>{email}</h5>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
