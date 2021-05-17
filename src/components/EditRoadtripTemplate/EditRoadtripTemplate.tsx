import { memo, useState, DragEvent, FC, useEffect } from 'react'

import {
  Box,
  List,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
// Import BoardItem component
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectIsTest,
  selectMapRoute,
  selectUiSelectedCategories,
  selectUserToken,
} from '../../store/selectors'
import DisplayMapFC from '../../utils/DisplayMapFC'
import { initUserData } from '../../utils/initUserData'
import { StyledBox, DragListItem, ContentBox, CreateButton } from './style'

export type EditRoadtripComponentProps = {
  dndStateOrder: Array<Record<string, any>>
  onSave: () => void
  listInfo: Array<Record<string, any>>
  onChange: (r: Array<Record<string, any>>) => void
  usage?: 'create' | 'update'
}
const EditRoadtripTemplate: FC<EditRoadtripComponentProps> = ({
  dndStateOrder,
  onSave,
  listInfo,
  onChange,
  usage = 'create',
}) => {
  const dispatch = useDispatch()
  const [list, setList] = useState(listInfo)
  const initialDnDState = {
    draggedFrom: 0,
    draggedTo: 0,
    isDragging: false,
    originalOrder: dndStateOrder,
    updatedOrder: dndStateOrder,
  }
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
  const token = useSelector(selectUserToken())

  useEffect(() => {
    setList(listInfo)
  }, [listInfo])

  const isTest = useSelector(selectIsTest())

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
    setList(newList)
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

    onChange(list)

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

  // für die Zusammenfassung welche Kategorien für den Roadtrip verwendet wurden
  const selectedCategories = useSelector(selectUiSelectedCategories())

  const theme = useTheme()
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ContentBox>
        {!isTest && (
          <DisplayMapFC
            allLocations={mapRoute}
            isSmall={usage === 'create' && isLaptop}
          />
        )}
        <StyledBox isLaptop={isLaptop} id="dnd_list">
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
                  onClick={() => {
                    const mapEvent: Event = new CustomEvent('customMapEvent', {
                      detail: {
                        lat: +mapRoute[index].slice(
                          0,
                          mapRoute[index].indexOf(',')
                        ),
                        lng: +mapRoute[index].slice(
                          mapRoute[index].indexOf(',') + 1,
                          mapRoute[index].length
                        ),
                      },
                      bubbles: true,
                      cancelable: true,
                      composed: false,
                    })
                    window.dispatchEvent(mapEvent)
                  }}
                >
                  <ListItemText primary={item.address || item.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        setList(list.filter((listitem) => listitem !== item))
                        onChange(list.filter((listitem) => listitem !== item))
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </DragListItem>
              )
            })}
          </List>
        </StyledBox>
      </ContentBox>
      <CreateButton
        id="roadtrip_erstellen_button"
        onClick={async () => {
          await onSave()
          await initUserData(token, dispatch)
        }}
      >
        {usage === 'update' ? 'Roadtrip bearbeiten' : 'Roadtrip erstellen'}
      </CreateButton>
    </Box>
  )
}

export default memo(EditRoadtripTemplate)
