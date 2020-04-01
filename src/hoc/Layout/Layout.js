import React, { Component } from "react";

import Auxx from "../Auxx/Auxx";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class layout extends Component {
  state = {
    showSideDrawer: false
  };

  handleSideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  };

  handleSideDrawerToggle = () => {
    this.setState(prevState =>{
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
    return (
      <Auxx>
        <Toolbar drawerToggleClicked={this.handleSideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          onClose={this.handleSideDrawerClose}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

export default layout;
