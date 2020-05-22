import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxx from '../../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    const { show, modalClose } = this.props;
    return (
      <Auxx>
        <Backdrop show={show} clicked={modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)",
            opacity: show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxx>
    );
  }
}

export default Modal;