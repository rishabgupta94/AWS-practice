// import { Button } from 'bootstrap';
import axios from "axios";
import React, { Component } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  FormGroup,
  ListGroup,
} from "react-bootstrap";

class ToDo extends Component {
  state = {
    book: {
      name: "",
      description: "",
    },
    data: [],
  };

  handleChange = (e) => {
    let book = { ...this.state.book };
    book[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ book });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.book);
  };

  getBooks = async () => {
    let response = await axios.get(
      "https://eej3itqw3h.execute-api.ca-central-1.amazonaws.com/production/books"
    );
    let data = JSON.parse(response.data.body);
    this.setState({ data });
    // console.log(JSON.parse(data));
  };

  createBooks = async (e) => {
    e.preventDefault();
    let data = {
      body: `{"title": "${this.state.book.name}", "description": "${this.state.book.description}"}`,
    };
    let response = await axios.post(
      "https://eej3itqw3h.execute-api.ca-central-1.amazonaws.com/production/books",
      data
    );
    console.log(response);
  };

  showList = () => {
    let data = this.state.data;
    if (data.length > 0) {
      return (
        <ListGroup>
          {data.map((book) => (
            <ListGroup.Item>{book.title}</ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };

  render() {
    return (
      <div className="mt-5">
        <Container>
          <Card>
            <Card.Header>To Do List</Card.Header>
            <Card.Body>
              Made some change
              <Form onSubmit={this.createBooks}>
                <Form.Group>
                  <Form.Control
                    name="name"
                    placeholder="Enter the name of the book"
                    type="text"
                    value={this.state.book.name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="description"
                    placeholder="Enter the description of the book"
                    type="text"
                    value={this.state.book.description}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Button type="submit">Submit</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Button onClick={this.getBooks}>Get Books</Button>
        </Container>
        <Container>{this.showList()}</Container>
      </div>
    );
  }
}

export default ToDo;
