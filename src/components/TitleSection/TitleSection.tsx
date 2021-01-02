import React, { memo } from "react";
import { Box, Typography } from "@material-ui/core";

const TitleSection = () => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h1">
        "Roads were made for journeys, not destinations"
      </Typography>
      {/* <Typography variant="body1">Explanation here</Typography> */}
    </Box>
  );
};
export default memo(TitleSection);
