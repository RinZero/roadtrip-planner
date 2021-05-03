import React, { memo, useState, DragEvent, FC } from 'react'

import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  withTheme,
  Button,
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
import { DisplayMapClass } from '../../utils/DisplayMapClass'
import { initUserData } from '../../utils/initUserData'

const StyledBox = withTheme(styled(Box)`
  margin-top: ${(props) => props.theme.spacing(1.5)}px;
  min-width: ${(props) => props.theme.spacing(25)}px;
  overflow: auto;
  max-height: ${(props) => props.theme.spacing(3.4)}vh;
  .MuiList-root {
    display: inline;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 25%;
    margin-top: 0px;
    max-height: ${(props) => props.theme.spacing(6.5)}vh;
    margin-left: ${(props) => props.theme.spacing(2)}px;
    .MuiListItemSecondaryAction-root {
      top: 28%;
      ${(props) => props.theme.breakpoints.up('md')} {
        top: 50%;
      }
    }
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
  margin: ${(props) => props.theme.spacing(3.75)}px 0;
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

  const isTest = useSelector(selectIsTest())
  // const testRoadtripInfo: {
  //   address: string
  //   categories: {
  //     id: string
  //     name: string
  //     primary?: boolean | undefined
  //   }
  //   coordinates: number[]
  //   api_key: string
  //   entry?: userEntry | undefined
  // }[] = [
  //   {
  //     address: 'test1',
  //     categories: {
  //       id: 'dfsf',
  //       name: 'teserf',
  //     },
  //     coordinates: [1, 2],
  //     api_key: '',
  //     entry: {
  //       public: true,
  //       is_allowed: true,
  //       name: 'Campus Urstein Beer Pong',
  //       description: 'Jeden Mittwoch gibt es Beer Pong Tutorium.',
  //       latitude: 47.7229439,
  //       longitude: 13.0877695,
  //       category: '[{"number":"200","name":"Going Out-Entertainment"}]',
  //     },
  //   },
  //   {
  //     address: 'test2',
  //     categories: {
  //       id: 'dfsfdfd',
  //       name: 'teserdfsdf',
  //     },
  //     coordinates: [1, 2],
  //     api_key: '',
  //     entry: {
  //       public: false,
  //       is_allowed: false,
  //       name: 'Jonathans Wohnung',
  //       description: 'Jonathan für ein Bier besuchen.',
  //       latitude: 47.8130689,
  //       longitude: 13.0691801,
  //       category:
  //         '[{"number":"100","name":"Eat and Drink"},{"number":"200-2000-0011","name":"Bar or Pub"},{"number":"200-2000-0019","name":"Beer Garden"}]',
  //     },
  //   },
  //   {
  //     address: 'test23',
  //     categories: {
  //       id: 'dfsfdfdre',
  //       name: 'teserdfsdf',
  //     },
  //     coordinates: [1, 2],
  //     api_key: 'here:pds:place:040u23pz-a8f12e3706a241f49c577da6d572893b',
  //   },
  // ]

  //   const submitRoadtrip = async () => {
  //     const roadtripData: createRoadtripType = {
  //       data: {
  //         type: 'roadtrip',
  //         locations: [],
  //         attributes: {
  //           name: 'Roadtrip test',
  //           public: false,
  //           distance: 1,
  //         },
  //       },
  //     }
  //     roadtripInfo.forEach((info) => {
  //       //TODO if check between api and user entries
  //       if (info.entry) {
  //         // User Entry
  //         roadtripData.data.locations.push({
  //           api_entry: undefined,
  //           user_entry: info.entry,
  //         })
  //       } else {
  //         // APi entry
  //         roadtripData.data.locations.push({
  //           api_entry: { api_entry_key: info.api_key },
  //           user_entry: undefined,
  //         })
  //       }
  //     })
  //     const result = await createRoadtrip(roadtripData, token)
  //   }
  //TODO: remove test code

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

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ContentBox>
        {!isTest && <DisplayMapClass allLocations={mapRoute} />}
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
