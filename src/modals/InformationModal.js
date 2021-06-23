import React from "react";
import { Modal, Button } from "react-bootstrap";

function InformationModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body >
        <h3 >Your changes has been made!</h3>
        <p >Frontwiki - changes registered</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InformationModal;
