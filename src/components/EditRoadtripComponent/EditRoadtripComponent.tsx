import React, { memo, useState } from 'react'

import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  withTheme,
} from '@material-ui/core'
// Import BoardItem component
import DeleteIcon from '@material-ui/icons/Delete'
import styled from 'styled-components'

const StyledBox = withTheme(styled(Box)`
  width: 20%;
`)

// https://dev.to/florantara/creating-a-drag-and-drop-list-with-react-hooks-4c0i
const items = [
  { number: '1', title: '🇦🇷 Argentina' },
  { number: '2', title: '🤩 YASS' },
  { number: '3', title: '👩🏼‍💻 Tech Girl' },
  { number: '4', title: '💋 Lipstick & Code' },
  { number: '5', title: '💃🏼 Latina' },
]

const initialDnDState = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [
    {
      number: '',
      title: '',
    },
  ],
  updatedOrder: [
    {
      number: '',
      title: '',
    },
  ],
}

const EditRoadtripComponent = () => {
  const [list, setList] = React.useState(items)
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState)

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event: any) => {
    const initialPosition = Number(event.currentTarget.dataset.position)

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    })

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData('text/html', '')
  }

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event: any) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault()

    let newList = dragAndDrop.originalOrder

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position)

    const itemDragged = newList[draggedFrom]
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    )

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ]

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      })
    }
  }

  const onDrop = (event: any) => {
    setList(dragAndDrop.updatedOrder)

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: 0,
      draggedTo: 0,
      isDragging: false,
    })
  }

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: 0,
    })
  }

  return (
    <StyledBox>
      <List component="nav" aria-label="contacts">
        {list.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={
                dragAndDrop && dragAndDrop.draggedTo === Number(index)
                  ? 'dropArea'
                  : ''
              }
            >
              <ListItemText primary={item.number} secondary={item.title} />
              <ListItemSecondaryAction>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </StyledBox>
  )
}

export default memo(EditRoadtripComponent)
