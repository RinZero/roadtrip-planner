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

const RouteButton = styled(Button)`
  color: #b1b1b1;
  border-radius: 15px;
  background-color: white;
  border: solid #b1b1b1 2px !important;
  box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.2);
`;

const MyRoadtripCard = styled(Card)`
  max-width: 548px;
  padding: 25px;
  margin: 0 50px 50px 0;
  border-radius: 15px !important;
`;

const MyRoadtripCardMedia = styled(CardMedia)`
  height: 249px;
  background-color: lightblue;
  border-radius: 15px;
`;

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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <IconButton>⛷️</IconButton>
            <IconButton>🍺</IconButton>
          </div>
          <RouteButton variant="contained">
            <Box py={1} px={2}>
              Route
            </Box>
          </RouteButton>
        </Box>
      </MyRoadtripCard>
    </>
  );
};
export default memo(Roadtripcard);
