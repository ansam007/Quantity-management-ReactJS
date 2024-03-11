import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes["modal-overlay"]}>
      <div className={classes["modal-content"]}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </React.Fragment>
  );
};

export default Modal;
