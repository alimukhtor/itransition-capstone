import { Alert, Button, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
export const UpdateSingleCollection = ({
  showModal,
  handleCloseModal,
  setSingleCollection,
  singleCollection,
  fetchAllCollections,
  setUserNotAllowed,
  userPermission,
  userNotAllowed,
  setShowModal,
}) => {
  const [isCollectionUpdated, setCollectionUpdated] = useState(false);
  const token = window.localStorage.getItem("token");
  const updateSingleCollection = async (id) => {
    const response = await fetch(`${window.remote_url}/collections/${id}`, {
      method: "PUT",
      body: JSON.stringify(singleCollection),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      setCollectionUpdated(true);
      setUserNotAllowed(false);
      fetchAllCollections();
      setTimeout(() => {
        setCollectionUpdated(false);
        setShowModal(false);
      }, 2000);
    } else if (response.status === 401) {
      setUserNotAllowed(true);
      setTimeout(() => {
        setCollectionUpdated(false);
        setUserNotAllowed(false);
        setShowModal(false);
      }, 3000);
    }
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>
          <GrUpdate className="text-info" /> Update collection
        </Modal.Title>
        <ImCancelCircle
          onClick={handleCloseModal}
          className="ml-auto text-danger mt-2"
          style={{ fontSize: "25px" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          {isCollectionUpdated ? (
            <Alert variant="success" className="rounded-pill">
              <TiTick />
              Collection successfully updated
            </Alert>
          ) : userNotAllowed ? (
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
              value={singleCollection?.name}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              className="rounded-pill"
              placeholder="Description"
              value={singleCollection?.description}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Topic"
              value={singleCollection?.topic}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  topic: e.target.value,
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
            updateSingleCollection(singleCollection._id);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
