import React, { memo, useState, DragEvent } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { setRoadtripInfos } from '../../store/actions'
import {
  selectMapRoute,
  selectUiSelectedCategories,
  selectRoadtripInfos,
} from '../../store/selectors'
import { DisplayMapClass } from '../../utils/DisplayMapClass'
import { fetchHereData } from '../../utils/fetchHereData'

const StyledBox = withTheme(styled(Box)`
  width: 25%;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-height: ${(props) => props.theme.spacing(62.5)}px;
  margin-left: ${(props) => props.theme.spacing(2)}px;
`)
const DragListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

const ContentBox = withTheme(styled(Box)`
  display: block;
  margin: 0 auto;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`)

const initialDnDState = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  originalOrder: [
    {
      address: '',
      categories: { id: '', name: '' },
      coordinates: [0, 0],
    },
  ],
  updatedOrder: [
    {
      address: '',
      categories: { id: '', name: '' },
      coordinates: [0, 0],
    },
  ],
}

const EditRoadtripComponent = () => {
  const dispatch = useDispatch()
  const roadtripInfo = useSelector(selectRoadtripInfos())
  const [list, setList] = useState(roadtripInfo)
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
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
  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
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

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    setList(dragAndDrop.updatedOrder)
    dispatch(setRoadtripInfos({ roadtripInfos: list }))

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

  const mapRoute = useSelector(selectMapRoute())
  const selectedCategoriesMap = useSelector(selectUiSelectedCategories())
  // für die Zusammenfassung welche Kategorien für den Roadtrip verwendet wurden
  const selectedCategoriesNames = Array.from(selectedCategoriesMap.values())

  return (
    <ContentBox>
      <DisplayMapClass allLocations={mapRoute} />
      <StyledBox>
        <List component="nav" aria-label="contacts">
          {list.map((item, index) => {
            return (
              <DragListItem
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
                <ListItemText primary={item.address} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </DragListItem>
            )
          })}
        </List>
      </StyledBox>
    </ContentBox>
  )
}

export default memo(EditRoadtripComponent)
