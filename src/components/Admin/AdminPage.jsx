import "../../App.css";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
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
  }, []);
  const fetchUsers = async () => {
    const response = await fetch(
      `${window.remote_url}/users/allUsers`,
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

  // function to show modal
  const showModal = () => setModalShow(true);
  
  return (
    <Row className="main">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Col className="sidebar">
          <h2 className="test">Admin Page</h2>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" className="text-light">
                <BsCollection
                  className="mb-1 mx-2"
                  tabidstyle={{ fontSize: "20px" }}
                />
                Collections
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="second"
                className="text-light"
                onClick={showModal}
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
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Collections />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <UserList users={users} setUsers={setUsers} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Tab.Container>
    </Row>
  );
};
export default AdminPage;
