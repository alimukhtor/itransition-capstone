import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
export const UserProfile = ({
  smShow,
  setSmShow,
  setIsUserLoggedIn,
  loggedinUser,
  fetchAllCollections,
  setLoggedinUser,
  getUserInfo,
  setUserProfileModal,
  translate,
  setUsername,
}) => {
  const token = localStorage.getItem("token");
  const [userinfoUpdated, setUserinfoUpdated] = useState(false);
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear(token);
    fetchAllCollections();
    navigate("/");
    setSmShow(false);
    setIsUserLoggedIn(false);
  };

  const updateUserProfile = async (id) => {
    const response = await fetch(`http://localhost:3030/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(loggedinUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const username = localStorage.getItem("Username");
      if (username) {
        setUsername(data.username);
      }
      setUserinfoUpdated(true);
      setTimeout(() => {
        setUserinfoUpdated(false);
        setUserProfileModal(false);
      }, 2000);
    }
  };
  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-sm">
          <BiUserCircle className="mb-1" style={{ fontSize: "30px" }} />
          Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {userinfoUpdated ? (
            <Alert variant="success" className="rounded-pill">
              <TiTick />
              {translate("SuccessMsg")}
            </Alert>
          ) : null}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={loggedinUser?.username}
              onChange={(e) =>
                setLoggedinUser({
                  ...loggedinUser,
                  username: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={loggedinUser?.email}
              onChange={(e) =>
                setLoggedinUser({
                  ...loggedinUser,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={loggedinUser?.role}
              onChange={(e) =>
                setLoggedinUser({
                  ...loggedinUser,
                  role: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={loggedinUser?.status}
              onChange={(e) =>
                setLoggedinUser({
                  ...loggedinUser,
                  status: e.target.value,
                })
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-2">
            <Button
              variant="danger"
              onClick={logOutUser}
              className="rounded-pill"
            >
              Log out
            </Button>
            <Button
              variant="success"
              className="rounded-pill"
              onClick={() => updateUserProfile(loggedinUser._id)}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
