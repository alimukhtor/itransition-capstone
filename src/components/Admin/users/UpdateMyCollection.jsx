import { Alert, Button, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { useState } from "react";

export const UpdateMyCollection = ({
  showModal,
  handleCloseModal,
  singleCollection,
  setSingleCollection,
  getMyCollections,
  setShowModal,
  translate
}) => {
  const token = window.localStorage.getItem("token");
  const [isCollectionUpdated, setCollectionUpdated] = useState(false);
  const updateSingleCollection = async (id) => {
    const response = await fetch(`${window.remote_url}/collections/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...singleCollection }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      setCollectionUpdated(true);
      getMyCollections();
      setTimeout(() => {
        setCollectionUpdated(false);
        setShowModal(false);
      }, 2000);
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
              {translate("SuccessMsg")}
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
