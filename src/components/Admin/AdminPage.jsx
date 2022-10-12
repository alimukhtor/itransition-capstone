import { Button, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import "../../App.css";
import { FiPlusCircle } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import UserList from "./UserList";
import CreateCollection from "./CreateCollection";
import Collections from "./Collections";
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetchUsers();
  }, [setUsers]);
  const fetchUsers = async () => {
    const response = await fetch(
      "https://itransition-capstone.herokuapp.com/users/allUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    setUsers(data);
  };
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="main">
        <Col sm={2} className="sidebar">
          <h2 className="test">Admin Page</h2>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" className="text-light">
                <BsCollection
                  className="mb-1 mx-2"
                  tabIdstyle={{ fontSize: "20px" }}
                />
                Collections
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="second"
                className="text-light"
                onClick={() => setModalShow(true)}
              >
                <FiPlusCircle className="mx-1" style={{ fontSize: "20px" }} />
                Create collection
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third" className="text-light">
                <FiUsers className="mx-1" style={{ fontSize: "20px" }} />
                Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <CreateCollection
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Col>
        <Col sm={10} className="main-page">
        <div className="d-flex justify-content-center p-3">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search everything"
              className="mr-1 rounded-pill"
              aria-label="Search"
            />
            <Button variant="outline-success" className="rounded-pill">Search</Button>
          </Form>
        </div>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Collections />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <UserList users={users} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
export default AdminPage;
