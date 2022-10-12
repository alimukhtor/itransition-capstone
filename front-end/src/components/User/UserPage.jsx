import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import "../../App.css";
import { FiPlusCircle, FiUsers } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import CreateCollection from "./CreateCollection";
import { useState } from "react";
const UserPage = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="main">
        <Col sm={2} className="sidebar">
          <h2 className="test">User Page</h2>
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
              <Nav.Link eventKey="second" className="text-light">
                <FiUsers className="mx-1" style={{ fontSize: "20px" }} />
                Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third" className="text-light" onClick={() => setModalShow(true)}>
                <FiPlusCircle className="mx-1" style={{ fontSize: "20px" }} />
                Create collection
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <CreateCollection
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Col>
        <Col sm={10} className="main-page">
          <Tab.Content>
            <Tab.Pane eventKey="first">
              {/* <Collections /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {/* <UserList users={users} /> */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
export default UserPage;
