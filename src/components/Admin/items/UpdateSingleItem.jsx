import { Button, Form, Modal, Alert } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
export const UpdateSingleItem = ({
  showUpdateItemModal,
  handleCloseUpdateItemModal,
  singleItem,
  setSingleItem,
  fetchSingleCollection,
  userNotAllowed,
  setUserNotAllowed,
}) => {
  const token = window.localStorage.getItem("token");
  const updateSingleItem = async (id) => {
    const response = await fetch(`${window.remote_url}/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(singleItem),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      fetchSingleCollection();
    } else if (response.status === 401) {
      setUserNotAllowed(true);
    }
  };
  return (
    <Modal show={showUpdateItemModal} onHide={handleCloseUpdateItemModal}>
      <Modal.Header>
        <Modal.Title>
          <GrUpdate className="text-info" /> Update Item
        </Modal.Title>
        <ImCancelCircle
          onClick={handleCloseUpdateItemModal}
          className="ml-auto text-danger mt-2"
          style={{ fontSize: "25px" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          {userNotAllowed ? (
            <Alert variant="danger" className="rounded-pill">
              <AiFillWarning /> You are not allowed. Please register{" "}
              <Link to="/register">here</Link>
            </Alert>
          ) : null}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Name"
              value={singleItem?.name}
              onChange={(e) =>
                setSingleItem({
                  ...singleItem,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="rounded-pill"
          onClick={() => {
            updateSingleItem(singleItem._id);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
