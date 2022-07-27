import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ModalManager extends React.Component {
  render(){
    return(
      <div>
        <Modal size="lg" show={this.props.modalShow} onHide={this.props.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalManager