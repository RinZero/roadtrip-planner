import React, { memo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Tour, { ReactourStepPosition } from 'reactour'

import { updateTutorial } from '../../store/actions'
import { selectProgessStep } from '../../store/selectors'

type TutorialProps = {
  openBool: boolean[]
}

const Tutorial = (props: TutorialProps) => {
  const progressStep = useSelector(selectProgessStep())
  const index: number = +progressStep - 1
  const [open, setOpen] = useState(props.openBool[index])
  const dispatch = useDispatch()

  return (
    <>
      <Tour
        steps={stepsFoo[index]}
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        accentColor="#71b255"
        closeWithMask={true}
        disableFocusLock={true}
        rounded={15}
        onBeforeClose={() => {
          if (progressStep === '1')
            dispatch(updateTutorial({ tutorial: [false, true, true] }))
          else if (progressStep === '2')
            dispatch(updateTutorial({ tutorial: [false, false, true] }))
          else if (progressStep === '3')
            dispatch(updateTutorial({ tutorial: [false, false, false] }))
        }}
      />
    </>
  )
}
const stepsFoo = [
  [
    // Header
    {
      selector: '#header_profil_button',
      content: 'Hier kommst du zu deinem Profil.',
    },
    //Steps
    {
      selector: '#step_menu',
      content:
        'Hier kannst du zwischen den Schritten Navigieren. Wenn dir also später einfällt, dass du noch einen Zwischenstop einfügen möchstest, ist das kein Problem',
    },
    // Form
    {
      selector: '#start_stop',
      content:
        'In den Feldern kannst du deinen Start und Zielpunkt für deinen Roadtrip eingeben.',
      position: 'top' as ReactourStepPosition,
    },
    {
      selector: '#zwischenstopp',
      content: 'Da kannst du zusätzlich auch noch einen Zwischenstop eingeben.',
    },
    {
      selector: '#more_stops',
      content:
        'Wenn du noch mehr Stops brauchst einfach hier klicken. Maximum: 10',
    },
    {
      selector: '#start_button',
      content:
        'Hier Klicken wenn du fertig bist um zu den Kategorien zu kommen',
    },
  ],
  [
    // Select Category
    {
      selector: '#category_observe',
      content: () => {
        return (
          <p>
            Hier kannst du eine Überkategorie auswählen.
            <strong> Versuchs mal mit "Essen und Trinken"</strong>, dann siehst
            du die dazugehörigen Unterkategorien.
          </p>
        )
      },
      position: 'top' as ReactourStepPosition,
    },
    {
      selector: '[name="category2"]',
      content:
        'Du kannst jetzt entweder die Kategorie weiter eingrenzen oder ...',
    },
    {
      selector: '#category_add',
      content: '... die ausgewählte Kategorie hinzufügen',
      position: 'right' as ReactourStepPosition,
    },
    {
      selector: '#generiere_button',
      content:
        'Jetzt kannst du deinen Roadtrip generieren lassen, falls du mit deiner Kategorien Auswahl schon zufrieden bist.',
    },
  ],
  [
    // Roadtrip
    {
      selector: '#input_name_roadtrip',
      content: 'Hier kannst du deinen Roadtrip benennen,...',
    },
    {
      selector: '#map',
      content: '... die Karte genauer ansehen...',
    },
    {
      selector: '#dnd_list',
      content:
        '... und deinen Roadtrip noch bearbeiten durch verschieben oder löschen der Orte.',
    },
    {
      selector: '#roadtrip_erstellen_button',
      content:
        'Fertig? Dann kannst du deinen Roadtrip jetzt in deinem Profil speichern.',
    },
  ],
]
export default memo(Tutorial)
