import { memo, useState, DragEvent, FC, useEffect } from 'react'

import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  withTheme,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
// Import BoardItem component
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectIsTest,
  selectMapRoute,
  selectUiSelectedCategories,
  selectUserToken,
} from '../../store/selectors'
import DisplayMapFC from '../../utils/DisplayMapFC'
import { initUserData } from '../../utils/initUserData'

const StyledBox = withTheme(styled(Box)<{ isLaptop: boolean }>`
  margin-top: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-height: ${(props) => props.theme.spacing(6.2)}vh;
  .MuiList-root {
    display: inline;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 25%;
    margin-top: 0px;
    max-height: ${(props) => (props.isLaptop ? '35vh' : '45vh')};
    margin-left: ${(props) => props.theme.spacing(2)}px;
    .MuiListItemSecondaryAction-root {
      top: 28%;
      ${(props) => props.theme.breakpoints.up('md')} {
        top: 50%;
      }
    }
  }
  ${(props) => props.theme.breakpoints.between('md', 'lg')} {
    width: 40%;
  }
`)
const DragListItem = withTheme(styled(ListItem)`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  border: 1px solid rgb(0 0 0 / 16%);
  margin-bottom: ${(props) => props.theme.spacing(1.2)}px;
`)

const ContentBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacing(1)}px;
  ${(props) => props.theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`)
const CreateButton = withTheme(styled(Button)`
  width: ${(props) => props.theme.spacing(35)}px;
  color: #ffffff;
  background-color: #71b255;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  margin-top: ${(props) => props.theme.spacing(2)}px;
  &:hover,
  &:active {
    background-color: #355727;
  }
`)

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
  const selectedCategoriesMap = useSelector(selectUiSelectedCategories())
  // für die Zusammenfassung welche Kategorien für den Roadtrip verwendet wurden
  const selectedCategoriesNames = Array.from(selectedCategoriesMap.values())

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
        color="primary"
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
