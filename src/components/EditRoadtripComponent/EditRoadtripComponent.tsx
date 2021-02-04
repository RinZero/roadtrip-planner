import React, { memo, useState, useEffect } from 'react'

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

import { fetchHereData } from '../../utils/fetchHereData'

const StyledBox = withTheme(styled(Box)`
  width: 20%;
`)

const initialDnDState = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [
    {
      title: '',
      address: { label: '' },
    },
  ],
  updatedOrder: [
    {
      title: '',
      address: { label: '' },
    },
  ],
}

const EditRoadtripComponent = () => {
  const [list, setList] = useState([
    {
      title: '',
      address: { label: '' },
    },
  ])
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)

  const getItems = async () => {
    const data = await fetchHereData({
      object: { endpoint: 'discover', query: 'zoo' },
      at: { longitude: 47.7, latitude: 13.04399 },
      limit: 12,
      language: 'de',
      route: {
        stopps: [
          [47.79941, 13.04399, 1.0],
          [47.7, 13.04399, 2.0],
          [47.8, 13.04399, 3.0],
          [48.210552, 16.376495, 4.0],
          [46.6357, 14.311817, 5.0],
          [47.416, 15.2617, 6.0],
        ],
        width: 20000,
      },
    })
    setList(data.items)
  }

  useEffect(() => {
    getItems()
  }, [])

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
    <StyledBox style={{ maxHeight: 400, overflow: 'auto' }}>
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
              <ListItemText primary={item.address.label} />
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
