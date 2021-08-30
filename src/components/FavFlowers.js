import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button, Row } from "react-bootstrap";
import UpdateModal from "./UpdateModal";

class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      updateObj: {},
      showUpdateModel: false,
    };
  }
  showingModel = (element) => {
    this.setState({
      updateObj: element,
      showUpdateModel: true,
    });
  };

  componentDidMount() {
    axios

      .get(
        `${process.env.REACT_APP_SERVER}/fav?email=${this.props.auth0.user.email}`
      )
      .then((flowers) => {
        this.setState({
          favFlowers: flowers.data,
        });
      })
      .catch();
  }

  deletefav = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/delete/${id}`)
      .then((result) => {
        this.setState({
          favFlowers: result.data,
        });
      });
  };

  updateFav = (event) => {
    // event.preventDefault();
    const flowerId = this.state.updateObj._id;
    const body = {
      name: event.target.name.value,
      photo: event.target.photo.value,
      instructions: event.target.instructions.value,
    };
    axios
      .put(`${process.env.REACT_APP_SERVER}/update/${flowerId}`, body)
      .then((update) => {
        const flowerArr = this.state.favFlowers.map((flower) => {
          if (flower === flowerId) {
            flower.name = update.data.name;
            flower.photo = update.data.photo;
            flower.instructions = update.data.instructions;

            return flower;
          }
          return flower;
        });
        this.setState({
          favFlowers: flowerArr,
          showUpdateModel: false,
          updateObj: {},
        });
      });
  };

  render() {
    return (
      <>
        {this.showingModel && (
          <UpdateModal
            show={this.state.showUpdateModel}
            showingModel={this.showingModel}
            updateFav={this.updateFav}
            updateObj={this.state.updateObj}
          />
        )}
        <Row xs={1} md={5} className="g-4">
          {this.state.favFlowers.map((flower, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={flower.photo} />
                <Card.Body>
                  <Card.Title>{flower.name}</Card.Title>
                  <Card.Text>{flower.instructions}</Card.Text>
                  <Button
                    onClick={() => this.deletefav(flower._id)}
                    variant="primary"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => this.showingModel(flower)}
                    variant="primary"
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </>
    );
  }
}

export default withAuth0(FavFlowers);
