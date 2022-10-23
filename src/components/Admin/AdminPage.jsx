import "../../App.css";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import UserList from "./UserList";
import CreateCollection from "./collections/CreateCollection";
import Collections from "./collections/Collections";
import { MyCollections } from "./collections/MyCollections";
const AdminPage = ({
  setLoggedInUserData,
  setUserNotAllowed,
  userNotAllowed,
}) => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    if(userRole === 'admin'){
      const response = await fetch(`${window.remote_url}/users/allUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setUsers(data);
    }
  };

  // function to show modal
  const showModal = () => setModalShow(true);

  useEffect(() => {
    getUserInfo();
  }, [setLoggedInUserData]);

  // get user /me route
  const getUserInfo = async () => {
    const response = await fetch(`${window.remote_url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const user = await response.json();
      setLoggedInUserData(user);
      if (user.role === "admin") {
        setUserRole("Admin");
      } else {
        setUserRole("User");
      }
    }
  };
  return (
    <Row className="main">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Col className="sidebar">
          {userRole === "Admin" ? (
            <h2 className="text-info">Welcome to {userRole} Page</h2>
          ) : (
            <h2 className="text-info">Welcome to {userRole} Page</h2>
          )}
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              {userRole === "Admin" ? (
                <Nav.Link eventKey="first" className="text-light">
                  <BsCollection
                    className="mb-1 mx-2"
                    tabidstyle={{ fontSize: "20px" }}
                  />
                  Collections
                </Nav.Link>
              ) : (
                <Nav.Link eventKey="second" className="text-light">
                  <BsCollection
                    className="mb-1 mx-2"
                    tabidstyle={{ fontSize: "20px" }}
                  />
                  My Collections
                </Nav.Link>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="fourth"
                className="text-light"
                onClick={showModal}
              >
                <FiPlusCircle className="mx-1" style={{ fontSize: "20px" }} />
                Create collection
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {userRole === "Admin" ? (
                <Nav.Link eventKey="third" className="text-light">
                  <FiUsers className="mx-1" style={{ fontSize: "20px" }} />
                  Users
                </Nav.Link>
              ) : null}
            </Nav.Item>
          </Nav>
          <CreateCollection
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
          />
        </Col>
        <Col sm={10} className="main-page">
          <Tab.Content>
            {userRole === "Admin" ? (
            <>
            <Tab.Pane eventKey="first">
                <Collections
                  setUserNotAllowed={setUserNotAllowed}
                  userNotAllowed={userNotAllowed}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <UserList users={users} setUsers={setUsers} userRole={userRole} />
              </Tab.Pane>
              </>
            ) : (
              <Tab.Pane eventKey="second">
                <MyCollections />
              </Tab.Pane>
            )}
          </Tab.Content>
        </Col>
      </Tab.Container>
    </Row>
  );
};
export default AdminPage;
