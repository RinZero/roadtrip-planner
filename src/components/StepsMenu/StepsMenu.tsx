import React, { memo } from "react";
import { Box, Fab, Typography } from "@material-ui/core";
import styled from "styled-components";

const StyledFab = styled(Fab)`
  background-color: #fff;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
`;

const StepsMenu = () => {
  return (
    <Box display="flex" m={2} width="100%" justifyContent="space-evenly">
      <StyledFab
        onClick={() => console.log("placeholder for store dispatch 1")}
      >
        <Typography variant="h5">1</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => console.log("placeholder for store dispatch 2")}
      >
        <Typography variant="h5">2</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => console.log("placeholder for store dispatch 3")}
      >
        <Typography variant="h5">3</Typography>
      </StyledFab>
      <StyledFab
        onClick={() => console.log("placeholder for store dispatch 4")}
      >
        <Typography variant="h5">4</Typography>
      </StyledFab>
    </Box>
  );
};
export default memo(StepsMenu);
