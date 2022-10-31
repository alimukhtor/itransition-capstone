import { Button, Form, Modal, Alert } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
export const UpdateSingleItem = ({
  showUpdateItemModal,
  handleCloseUpdateItemModal,
  singleItem,
  setSingleItem,
  fetchSingleCollection,
  userNotAllowed,
  setUserNotAllowed,
  setShowUpdateItemModal,
  translate
}) => {
  const token = window.localStorage.getItem("token");
  const [isItemUpdated, setIsItemUpdated] = useState(false);
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
      setIsItemUpdated(true)
      setUserNotAllowed(false)
      fetchSingleCollection();
      setTimeout(() => {
        setIsItemUpdated(false);
        setShowUpdateItemModal(false);
      }, 2000);
    } else if (response.status === 401) {
      setUserNotAllowed(true);
      setTimeout(() => {
        setUserNotAllowed(false);
        setShowUpdateItemModal(false);
      }, 2000);
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
        {isItemUpdated ? (
            <Alert variant="success" className="rounded-pill">
              <TiTick />
              {translate("SuccessMsg")}
            </Alert>
          ) : userNotAllowed ? (
            <Alert variant="danger" className="rounded-pill">
              <AiFillWarning /> {translate("UserPermission")}
              <Link to="/register">{translate("ClickToRegister")}</Link>
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
