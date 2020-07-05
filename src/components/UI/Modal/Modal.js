import React from 'react';
import classes from './Modal.module.css';
import Auxx from '../../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  const { show, modalClose } = props;
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
        {props.children}
      </div>
    </Auxx>
  );
}

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);