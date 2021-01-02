import React, { memo } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";

const RouteButton = styled(Button)`
  color: #b1b1b1;
  padding: 10px 15px;
  border-radius: 15px;
  background-color: white;
  border: solid #b1b1b1 2px;
  box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
`;

const MyRoadtripCard = styled(Card)`
  max-width: 548px;
  padding: 25px;
  margin: 0 50px 50px 0;
  border-radius: 15px;
`;

const MyRoadtripCardMedia = styled(CardMedia)`
  height: 249px;
  background-color: lightblue;
  border-radius: 15px;
`;

const MyRoadtripLinks = styled(Grid)``;

const MyRoadtripIcons = styled(Grid)``;

const start = "Salzburg";
const destination = "Graz";
const stopsnumber = 15;

const Roadtripcard = () => {
  return (
    <>
      <MyRoadtripCard>
        <CardActionArea>
          <MyRoadtripCardMedia
            image="windows.jpg"
            src="windows.jpg"
            title="Your Roadtrip from Salzuburg to Graz"
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {start} - {destination}
            </Typography>
            <Typography color="textSecondary">{stopsnumber} Stops</Typography>
          </CardContent>
        </CardActionArea>
        <MyRoadtripLinks
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <MyRoadtripIcons>
            <IconButton>⛷️</IconButton>
            <IconButton>🍺</IconButton>
          </MyRoadtripIcons>
          <RouteButton>Route</RouteButton>
        </MyRoadtripLinks>
      </MyRoadtripCard>
    </>
  );
};
export default memo(Roadtripcard);
