import "../../App.css";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useEffect } from "react";
import { useState } from "react";
import UserList from "./users/UserList";
import CreateCollection from "./collections/CreateCollection";
import Collections from "./collections/Collections";
import { MyCollections } from "./users/MyCollections";
import { ToastContainer } from "react-toastify";

const AdminPage = ({
  setUserNotAllowed,
  userNotAllowed,
  userPermission,
  ToastContainer,
  isUserLoggedIn,
  collections,
  setCollections
}) => {
  const [users, setUsers] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const token = window.localStorage.getItem("token");

  // gets logged in user collections
  const getMyCollections = async () => {
    const response = await fetch(`${window.remote_url}/users/me/stories`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const collection = await response.json();
      console.log(collection);
      setUserCollections(collection);
    }
  };

  // gets all collections from db
  const fetchAllCollections = async () => {
    const response = await fetch(
      `http://localhost:3030/collections/allCollections`
    );
    if (response.ok) {
      const data = await response.json();
      setCollections(data);
    }
  };

  // gets all users from db
  const fetchUsers = async () => {
    if (userRole === "Admin") {
      const response = await fetch(`${window.remote_url}/users/allUsers`, {
        headers: {
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
  }, []);

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
      if (user.role === "admin") {
        setUserRole("Admin");
      } else {
        setUserRole("User");
      }
    }
  };
  return (
    <>
      {isUserLoggedIn ? <ToastContainer /> : null}
      <Row className="main">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Col className="sidebar">
            {userRole === "Admin" ? (
              <h4 className="text-info">Welcome to Admin Page</h4>
            ) : (
              <h4 className="text-info">Welcome to Users Page</h4>
            )}
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                {userRole === "Admin" ? (
                  <Nav.Link
                    eventKey="first"
                    className="text-light"
                    onClick={fetchAllCollections}
                  >
                    <BsCollection
                      className="mb-1 mx-2"
                      tabidstyle={{ fontSize: "20px" }}
                    />
                    Collections
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    eventKey="first"
                    className="text-light"
                    onClick={getMyCollections}
                  >
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
                  eventKey="second"
                  className="text-light"
                  onClick={showModal}
                >
                  <FiPlusCircle className="mx-1" style={{ fontSize: "20px" }} />
                  Create collection
                </Nav.Link>
              </Nav.Item>
              <CreateCollection
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                setCollections={setCollections}
                collections={collections}
              />
              <Nav.Item>
                {userRole === "Admin" ? (
                  <Nav.Link
                    eventKey="third"
                    className="text-light"
                    onClick={fetchUsers}
                  >
                    <FiUsers className="mx-1" style={{ fontSize: "20px" }} />
                    Users
                  </Nav.Link>
                ) : null}
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10} className="main-page">
            <Tab.Content>
              {userRole === "Admin" ? (
                <>
                  <Tab.Pane eventKey="first">
                    <Collections
                      setUserNotAllowed={setUserNotAllowed}
                      userNotAllowed={userNotAllowed}
                      userPermission={userPermission}
                      ToastContainer={ToastContainer}
                      setCollections={setCollections}
                      collections={collections}
                      fetchAllCollections={fetchAllCollections}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <UserList
                      users={users}
                      setUsers={setUsers}
                      userRole={userRole}
                    />
                  </Tab.Pane>
                </>
              ) : (
                <Tab.Pane eventKey="first">
                  <MyCollections
                    userCollections={userCollections}
                    setUserCollections={setUserCollections}
                  />
                </Tab.Pane>
              )}
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </>
  );
};
export default AdminPage;
