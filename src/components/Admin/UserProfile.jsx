import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
export const UserProfile = ({
  smShow,
  setSmShow,
  setIsUserLoggedIn,
  loggedinUser,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear(token);
    navigate("/");
    setSmShow(false);
    setIsUserLoggedIn(false);
  };
  console.log(loggedinUser);
  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-sm"><BiUserCircle className="mb-1" style={{fontSize:"30px"}}/>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={loggedinUser.username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={loggedinUser.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" value={loggedinUser.role} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" value={loggedinUser.status} />
          </Form.Group>
          <div className="d-flex justify-content-between mt-2">
            <Button
              variant="danger"
              onClick={logOutUser}
              className="rounded-pill"
            >
              Log out
            </Button>
            <Button variant="success" type="submit" className="rounded-pill">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
