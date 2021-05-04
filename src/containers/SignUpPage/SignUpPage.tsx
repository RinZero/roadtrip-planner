import React, { memo } from 'react'

import { Box, withTheme, Typography } from '@material-ui/core'
import styled from 'styled-components'

import bild from '../../assets/bild.jpg'
import bus from '../../assets/bus.jpg'
import frauenInAuto from '../../assets/frauenInAuto.jpg'
import SignUpCard from '../../components/SignUpCard/SignUpCard'
import SignUpForm from './SignUpForm'

const SignUpPageContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.up(1100)} {
    flex-direction: row;
    height: calc(
      100vh - ${(props) => props.theme.spacing(18)}px
    ); //100vh - (header(10) +footer(8))
  }
  margin-bottom: 0;
  margin: ${(props) => props.theme.spacing(10)}px 0
    ${(props) => props.theme.spacing(8)}px 0;
`)

const SignUpBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  heigh: 100%;
  margin-left: ${(props) => props.theme.spacing(7)}px;
  ${(props) => props.theme.breakpoints.down(1100)} {
    margin-right: ${(props) => props.theme.spacing(7)}px;
    margin-top: ${(props) => props.theme.spacing(1.5)}px;
  }
`)

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
