import "../../App.css";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { FiPlusCircle } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import UserList from "./users/UserList";
import CreateCollection from "./collections/CreateCollection";
import Collections from "./collections/Collections";
import { MyCollections } from "./users/MyCollections";
import { ToastContainer } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminPage = ({
  setUserNotAllowed,
  userNotAllowed,
  userPermission,
  ToastContainer,
  isUserLoggedIn,
  collections,
  setCollections,
  fetchAllCollections,
  customFields,
  setCustomFields,
  searchQueryFound,
  searchedResult,
  translate,
}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const token = window.localStorage.getItem("token");

  // need to fix token issue
  const [searchParams] = useSearchParams();
  window.localStorage.setItem("oauthToken", searchParams.get("accessToken"));
  // need to fix token issue

  useEffect(() => {
    getUserInfo();
  }, []);

  // gets logged in user collections
  const getMyCollections = async () => {
    const response = await fetch(`${window.remote_url}/users/me/stories`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const collection = await response.json();
      setUserCollections(collection);
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
              <h4 className="text-info">{translate("welcome")}</h4>
            ) : (
              <h4 className="text-info">Welcome to Users Page</h4>
            )}
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                {userRole === "Admin" ? (
                  <Nav.Link eventKey="first" className="text-light sidebar-btn">
                    <BsCollection
                      className="mb-1 mx-2"
                      tabidstyle={{ fontSize: "20px" }}
                    />
                    {translate("SideBarBtns.Collections")}
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    eventKey="first"
                    className="text-light sidebar-btn my-2"
                    onClick={getMyCollections}
                  >
                    <BsCollection
                      className="mb-1 mx-2"
                      tabidstyle={{ fontSize: "20px" }}
                    />
                    {translate("SideBarBtns.Mycollection")}
                  </Nav.Link>
                )}
              </Nav.Item>
              <Nav.Item className="my-2">
                <Nav.Link
                  eventKey="second"
                  className="text-light sidebar-btn"
                  onClick={showModal}
                >
                  <FiPlusCircle className="mx-1" style={{ fontSize: "20px" }} />
                  {translate("SideBarBtns.CreateCollection")}
                </Nav.Link>
              </Nav.Item>
              <CreateCollection
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={setModalShow}
                setCollections={setCollections}
                collections={collections}
                fetchAllCollections={fetchAllCollections}
                customFields={customFields}
                setCustomFields={setCustomFields}
                translate={translate}
              />
              <Nav.Item>
                {userRole === "Admin" ? (
                  <Nav.Link
                    eventKey="third"
                    className="text-light sidebar-btn"
                    onClick={fetchUsers}
                  >
                    <FiUsers className="mx-1" style={{ fontSize: "20px" }} />
                    {translate("SideBarBtns.Users")}
                  </Nav.Link>
                ) : null}
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10} className="main-page">
            {searchQueryFound ? (
              searchedResult.map((item) => (
                <Col lg={3} key={item._id} className="p-3">
                  <Card className="card">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      className="card_img"
                    />
                    <Card.Body className="card_body">
                      <Card.Title className="title">{item.name}</Card.Title>
                      <div className="item-section">
                        <div>
                          <span>
                            <AiOutlineLike />
                          </span>
                          <span>
                            <GoComment />
                          </span>
                        </div>
                        <div className="item_btns">
                          <button disabled={true}>delete</button>
                          <button
                            onClick={() => navigate(`/singleItem/${item._id}`)}
                          >
                            view
                          </button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Tab.Content>
                {userRole === "Admin" ? (
                  <>
                    <Tab.Pane eventKey="first">
                      <Collections
                        setUserNotAllowed={setUserNotAllowed}
                        userNotAllowed={userNotAllowed}
                        userPermission={userPermission}
                        setCollections={setCollections}
                        collections={collections}
                        fetchAllCollections={fetchAllCollections}
                        translate={translate}
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
                      getMyCollections={getMyCollections}
                      translate={translate}
                    />
                  </Tab.Pane>
                )}
              </Tab.Content>
            )}
          </Col>
        </Tab.Container>
      </Row>
    </>
  );
};
export default AdminPage;
