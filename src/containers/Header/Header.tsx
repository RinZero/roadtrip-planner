import React, { memo } from "react";
import { Button, AppBar, Toolbar, IconButton, Link } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

// Art 2
const LogoutButton = styled(Button)`
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  background-color: #e67676;
  border-radius: 8px;
  padding: 1px 36px;
`;
const AccountButton = styled(IconButton)`
  color: #000000;
  font-size: 30px;
  padding: 0px;
`;

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link onClick={() => console.log("placeholder to create roadtrip")}>
            Neuer Roadtrip
          </Link>
          <Link onClick={() => console.log("placeholder to create location")}>
            Ort hinzufügen
          </Link>
          <AccountButton aria-label="profile">
            <AccountCircleIcon
              onClick={() => console.log("placeholder to profile")}
            />
          </AccountButton>
          <LogoutButton onClick={() => console.log("placeholder for logout")}>
            Log out
          </LogoutButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(Header);
