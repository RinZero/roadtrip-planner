import { memo, useState, DragEvent, FC, useEffect } from 'react'

import {
  Box,
  List,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
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
import {
  StyledBox,
  DragListItem,
  ContentBox,
  CreateButton,
  ArrowButton,
} from './style'

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

  const regex = new RegExp('([^-]+$)')
  const getIndex = (dndID: string) => {
    const dndNumberArr = dndID.match(regex)
    const dndString = dndNumberArr ? dndNumberArr.pop() : ''
    const dndNumber: number = dndString ? +dndString : -1
    return dndNumber
  }

  const array_move = (
    arr: Array<Record<string, any>>,
    old_index: number,
    new_index: number
  ) => {
    // eslint-disable-next-line prefer-const
    let arrCopy = [...arr]
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1
      while (k--) {
        arrCopy.push([''])
      }
    }
    arrCopy.splice(new_index, 0, arrCopy.splice(old_index, 1)[0])
    return arrCopy
  }

  const moveMobile = (event: Record<string, any>, direction: string) => {
    const id = event.target.parentElement.parentElement.id
      ? event.target.parentElement.parentElement.id
      : event.target.parentElement.id
    const dndNumber = getIndex(id)
    if (direction === 'up') moveUp(dndNumber)
    else if (direction === 'down') moveDown(dndNumber)
  }

  const moveUp = (dndNumber: number) => {
    if (dndNumber > 0) {
      const newList = array_move(list, dndNumber, dndNumber - 1)
      setList(newList)
      onChange(newList)
    }
  }

  const moveDown = (dndNumber: number) => {
    if (dndNumber < list.length - 1 && dndNumber > -1) {
      const newList = array_move(list, dndNumber, dndNumber + 1)
      setList(newList)
      onChange(newList)
    }
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
                >
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {!isLaptop ? (
                      <ArrowButton
                        id={`up-button-dnd-${index}`}
                        color="primary"
                        onClick={(e: Record<string, any>) => {
                          moveMobile(e, 'up')
                        }}
                        aria-label="Ort in Route 1 nach vorne verschieben"
                        title="Ort in Route 1 nach vorne verschieben"
                      >
                        <ArrowUpwardIcon />
                      </ArrowButton>
                    ) : (
                      ''
                    )}
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <ListItemText primary={item.address || item.name} />
                      <IconButton
                        onClick={() => {
                          setList(list.filter((listitem) => listitem !== item))
                          onChange(list.filter((listitem) => listitem !== item))
                        }}
                        aria-label="Ort aus Roadtrip löschen"
                        title="Ort aus Roadtrip löschen"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    {!isLaptop ? (
                      <ArrowButton
                        button
                        id={`down-button-dnd-${index}`}
                        color="primary"
                        onClick={(e: Record<string, any>) => {
                          moveMobile(e, 'down')
                        }}
                        aria-label="Ort in Route 1 nach hinten verschieben"
                        title="Ort in Route 1 nach hinten verschieben"
                      >
                        <ArrowDownwardIcon />
                      </ArrowButton>
                    ) : (
                      ''
                    )}
                  </Box>
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
