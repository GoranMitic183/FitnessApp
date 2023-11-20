import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import React from "react";
import Messages from "./messages.component";
import classes from "./inboxMessages.module.css"

const InboxModal = forwardRef(function Modal({actions}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className={classes.dialog} style={{background: "#d8d8d8", borderRadius: "1rem"}} id="modal" ref={dialog}>
        <h2>Inbox</h2>
        <Messages />
        <form method="dialog" id="modal-actions" style={{display: "flex"}}>
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default InboxModal;
