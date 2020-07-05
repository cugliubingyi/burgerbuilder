import React, { useState } from "react";
import { connect } from 'react-redux';

import Auxx from "../Auxx/Auxx";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const handleSideDrawerClose = () => {
    setSideDrawerIsVisible(false);
  };

  const handleSideDrawerToggle = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }

  return (
    <Auxx>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={handleSideDrawerToggle}
      />
      <SideDrawer
        open={sideDrawerIsVisible}
        onClose={handleSideDrawerClose}
      />
      <main className={classes.content}>{props.children}</main>
    </Auxx>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, null)(Layout);
