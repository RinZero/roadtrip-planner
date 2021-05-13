import React, { memo } from 'react'

import { Typography } from '@material-ui/core'

import bild from '../../assets/bild-small.jpg'
import bus from '../../assets/bus-small.jpg'
import frauenInAuto from '../../assets/frauenInAuto-small.jpg'
import SignUpCard from '../../components/SignUpCard/SignUpCard'
import SignUpForm from './SignUpForm'
import { SignUpPageContainer, SignUpBox } from './style'

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <SignUpBox>
        <SignUpCard
          text={
            <Typography variant="body1">
              <u>Schnell</u> und <u>einfach</u> deinen <b>einzigartigen</b>{' '}
              Roadtrip durch Österreich planen.
            </Typography>
          }
          title={'Entdecke Österreich'}
          isLeft={false}
          size={20}
          image={bus}
          color={'darkseagreen'}
        />
        <SignUpCard
          text={
            <>
              <Typography variant="body1">
                Wähle aus interessanten <b>Kategorien</b> und wir generieren dir
                dann den perfekten Roatrip.
              </Typography>
              <Typography variant="body1">
                Plane <b>Roadtrips</b> gemeinsam mit deinen Freunden.
              </Typography>
              <Typography variant="body1">
                Speichere deine <b>Lieblingsorte</b> und teile sie mit der
                Community.
              </Typography>
            </>
          }
          title={'Unsere Features'}
          isLeft={true}
          size={30}
          image={frauenInAuto}
          color={'lightblue'}
        />
        <SignUpCard
          text={
            <Typography variant="body1">
              Steig jetzt ein um uns auf dem Weg vom Projekt zur fertigen
              Webseite zu begleiten. Melde dich jetzt{' '}
              <b>
                <u>kostenlos</u>
              </b>{' '}
              an.
            </Typography>
          }
          title={'Jetzt ganz NEU'}
          isLeft={false}
          size={25}
          image={bild}
          color={'orange'}
        />
      </SignUpBox>
      <SignUpForm />
    </SignUpPageContainer>
  )
}

export default memo(SignUpPage)
