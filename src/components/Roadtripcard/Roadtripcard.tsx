import React, { memo } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

const MyRoadtripCard = withTheme(styled(Card)`
  max-width: ${(props) => props.theme.spacing(68.5)}px;
  padding: ${(props) => props.theme.spacing(3.125)}px;
  margin: 0 ${(props) => props.theme.spacing(6.25)}px
    ${(props) => props.theme.spacing(6.25)}px 0;
  border-radius: 15px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`);

// später kommt hier ein Bild von der Karte oderso hin
const MyRoadtripCardMedia = withTheme(styled(CardMedia)`
  height: ${(props) => props.theme.spacing(31.125)}px;
  background-color: lightblue;
  border-radius: 15px;
`);

const start = "Salzburg";
const destination = "Graz";
const stopsnumber = 15;

const Roadtripcard = () => {
  return (
    <>
      <MyRoadtripCard variant="outlined" square>
        <CardActionArea>
          <MyRoadtripCardMedia
            image="windows.jpg"
            src="windows.jpg"
            title="Your Roadtrip from Salzuburg to Graz"
          />
          <CardContent>
            <Typography align="left" variant="h5" component="h2">
              {start} - {destination}
            </Typography>
            <Typography align="left" color="textSecondary">
              {stopsnumber} Stops
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <IconButton>⛷️</IconButton>
            <IconButton>🍺</IconButton>
          </div>
          <Button className="large">
            <Typography variant="button">Route</Typography>
          </Button>
        </Box>
      </MyRoadtripCard>
    </>
  );
};
export default memo(Roadtripcard);
