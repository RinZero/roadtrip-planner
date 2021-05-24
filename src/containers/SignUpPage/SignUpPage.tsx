import React, { memo } from 'react'

import { Typography, IconButton } from '@material-ui/core'
import { ArrowDownwardRounded } from '@material-ui/icons'

import bild from '../../assets/bild-small.jpg'
import bus from '../../assets/bus-small.jpg'
import frauenInAuto from '../../assets/frauenInAuto-small.jpg'
import SignUpCard from '../../components/SignUpCard/SignUpCard'
import SignUpForm from './SignUpForm'
import {
  SignUpPageContainer,
  SignUpBox,
  TitleTypography,
  DownscrollIconButton,
} from './style'

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <SignUpBox>
        {/* <SignUpCard
          text={
            <Typography variant="body1">
              <u>Schnell</u> und <u>einfach</u> deinen <b>einzigartigen</b>{' '}
              Roadtrip durch Österreich planen.
            </Typography>
          }
          title={'Entdecke Österreich'}
          isLeft={true}
          size={20}
          image={bus}
          color={'darkseagreen'}
        />
        {/* <SignUpCard
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
              Melde dich jetzt{' '}
              <b>
                <u>kostenlos</u>
              </b>{' '}
              an und sichere dir deinen Usernamen.
            </Typography>
          }
          title={'Jetzt ganz NEU'}
          isLeft={false}
          size={25}
          image={bild}
          color={'orange'}
        /> */}
        <TitleTypography variant="h1">
          "Schnell und einfach deinen einzigartigen Roadtrip durch Österreich
          planen."
        </TitleTypography>
        <TitleTypography variant="h3">
          <div
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth',
              })
            }
          >
            Melde dich jetzt <u>kostenlos</u> an und sichere dir deinen
            Usernamen.
          </div>
        </TitleTypography>
        <DownscrollIconButton
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              left: 0,
              behavior: 'smooth',
            })
          }
        >
          <ArrowDownwardRounded />
        </DownscrollIconButton>
      </SignUpBox>
      <SignUpForm />
    </SignUpPageContainer>
  )
}

export default memo(SignUpPage)
