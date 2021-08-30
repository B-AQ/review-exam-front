import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export class UpdateModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.showingModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>

        <Form onSubmit={(e) => this.props.updateFav(e)}>
          <Form.Group className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              defaultValue={this.props.updateObj.name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>photo</Form.Label>
            <Form.Control
              type="text"
              placeholder="photo"
              name="photo"
              defaultValue={this.props.updateObj.photo}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Instructions"
              name="instructions"
              defaultValue={this.props.updateObj.instructions}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
