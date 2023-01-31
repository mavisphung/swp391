import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="primary" type="submit" onClick={props.handleSubmit}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
