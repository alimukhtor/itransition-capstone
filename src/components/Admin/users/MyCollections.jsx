import "../../../App.css";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { UpdateMyCollection } from "./UpdateMyCollection";
import { ToastContainer, toast } from "react-toastify";

export const MyCollections = ({userCollections, setUserCollections}) => {
  const [singleCollection, setSingleCollection] = useState();
  const [isCollectionDeleted, setIsCollectionDeleted] = useState(false);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const successMsg = () => {
    toast.success("Deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const getSingleCollection = async (id) => {
    const response = await fetch(`${window.remote_url}/collections/${id}`);
    if (response.ok) {
      const collection = await response.json();
      setSingleCollection(collection);
    }
  };
  // deletes single collection by id
  const deleteCollection = async (id) => {
    const response = await fetch(
      `${window.remote_url}/collections/${id}/deleteCollection`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      setIsCollectionDeleted(true);
      const restCollections = userCollections.filter((c) => c._id !== id);
      setUserCollections(restCollections);
    }
  };
  return (
    <>
      {isCollectionDeleted ? <ToastContainer /> : null}
      <Row>
        {userCollections.map((collection) => (
          <Col xs={12} md={6} lg={3} key={collection._id} className="p-4">
            <Card className="card border-0 h-100">
              <Card.Img src={collection.image} className="card_img" />
              <Card.Body className="card_body">
                <span className="tag tag-teal">{collection.topic}</span>
                <span
                  className="edit-collection"
                  onClick={() => {
                    handleShowModal();
                    getSingleCollection(collection._id);
                  }}
                >
                  <GrEdit />
                </span>
                {/* <UpdateMyCollection showModal={showModal}
                  handleCloseModal={handleCloseModal}
                  setSingleCollection={setSingleCollection}
                  singleCollection={singleCollection}
                  /> */}
                <Card.Title className="title">{collection.name}</Card.Title>
                <Card.Text className="text">{collection.description}</Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="card_btn">
                    <button
                      variant="success"
                      type="submit"
                      className="card_btn"
                      onClick={() =>
                        navigate(`/singleCollection/${collection._id}`)
                      }
                    >
                      view
                    </button>
                    <button
                      variant="danger"
                      type="submit"
                      className="card_btn"
                      onClick={() => {
                        deleteCollection(collection._id);
                        successMsg();
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
