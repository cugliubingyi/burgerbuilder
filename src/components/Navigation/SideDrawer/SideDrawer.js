import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx/Auxx';

const SideDrawer = props => {
  let attachedClasses =  [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxx>
      <Backdrop show={props.open} clicked={props.onClose}/>
      <div className={attachedClasses.join(' ')} onClick={props.onClose}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxx>
  );
};

export default SideDrawer;