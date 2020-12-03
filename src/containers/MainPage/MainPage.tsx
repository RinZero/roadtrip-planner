import React, { memo } from "react";

import TestComponent from "components/TestComponent";

const MainPage = () => {
  return (
    <>
      <h1>Hello World</h1>
      <TestComponent />
    </>
  );
};

export default memo(MainPage);
