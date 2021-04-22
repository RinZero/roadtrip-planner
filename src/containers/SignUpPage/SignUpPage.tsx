import React, { memo } from 'react'

import { Box, withTheme, Paper, Typography } from '@material-ui/core'
import styled from 'styled-components'

import bus from '../../assets/bus.jpg'
import frauenInAuto from '../../assets/frauenInAuto.jpg'
import jonathan from '../../assets/jonathan.jpeg'
import SignUpCard from '../../components/SignUpCard/SignUpCard'
import SignUpForm from './SignUpForm'

const ImageCircle = withTheme(styled.div`
  border-radius: 10000000000000000px;
  width: ${(props) => props.theme.spacing(12.5)}px;
  height: ${(props) => props.theme.spacing(12.5)}px;
  background-color: blue;
  margin-left: -${(props) => props.theme.spacing(7.5)}px;
`)

const InfoPaper = withTheme(styled(Paper)`
  height: ${(props) => props.theme.spacing(15)}px;
  width: ${(props) => props.theme.spacing(40)}px;
`)

const CardContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`)

const SignUpPageContainer = withTheme(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: ${(props) => props.theme.spacing(5)}px;
  height: calc(
    100vh - ${(props) => props.theme.spacing(13)}px
  ); //100vh - (header(5) +footer(4))
`)

const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        height="100%"
        ml={7}
      >
        {/* WAS */}
        <SignUpCard
          text={
            <Typography variant="body1">
              <u>Schnell</u> und <u>einfach</u> deinen <b>einzigartigen</b>{' '}
              Roadtrip durch Österreich planen.
            </Typography>
          }
          title={'Leb auf der Straße'}
          isLeft={false}
          size={20}
          image={bus}
          color={'darkseagreen'}
        />
        {/* Features */}
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
        {/* Beta & signUp*/}
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
          image={jonathan}
          color={'orange'}
        />
        {/*  oder über uns reden*/}
        {/* <SignUpCard
          text={
            <Typography variant="body1">
              Wir - Julia, Maria und Jonathan - sind ein junges und engagiertes
              Entwicklerteam, das es sich zur Aufgabe gemacht hat eine Website
              zu bauen. Juhu.
            </Typography>
          }
          title={'Team ROADABOUT'}
          isLeft={true}
          size={10}
          image="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        /> */}
      </Box>
      <SignUpForm />
    </SignUpPageContainer>
  )
}

export default memo(SignUpPage)
