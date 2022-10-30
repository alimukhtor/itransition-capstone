import "../../../App.css";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { UpdateSingleCollection } from "./UpdateSingleCollection";
import { ToastContainer, toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const Collections = ({
  setUserNotAllowed,
  userNotAllowed,
  userPermission,
  ToastContainer,
  collections,
  setCollections,
  fetchAllCollections,
  translate
}) => {
  const [singleCollection, setSingleCollection] = useState(null);
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const successMsg = () => {
    toast.success("Deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  // deletes single collection by id
  const deleteCollection = async (id) => {
    const response = await fetch(
      `${window.remote_url}/collections/${id}/deleteCollection`,
      {
        method: "DELETE",
        body: JSON.stringify({ userId: userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const restCollections = collections.filter((c) => c._id !== id);
      setCollections(restCollections);
    } else if (response.status === 401) {
      setUserNotAllowed(true);
    }
  };

  // gets single collection by id
  const getSingleCollection = async (selectedCollectionId) => {
    const response = await fetch(
      `${window.remote_url}/collections/${selectedCollectionId}`
    );
    if (response.ok) {
      const collection = await response.json();
      setSingleCollection(collection);
    }
  };

  return (
    <>
      { userNotAllowed ? <ToastContainer /> : null}
      <Row>
        {collections.map((collection) => (
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
                <UpdateSingleCollection
                  showModal={showModal}
                  setShowModal={setShowModal}
                  handleCloseModal={handleCloseModal}
                  setSingleCollection={setSingleCollection}
                  singleCollection={singleCollection}
                  fetchAllCollections={fetchAllCollections}
                  setUserNotAllowed={setUserNotAllowed}
                  userNotAllowed={userNotAllowed}
                  userPermission={userPermission}
                  translate={translate}
                />
                <Card.Title className="title">{collection.name}</Card.Title>
                <Card.Text className="text">
                  {" "}
                  <ReactMarkdown>
                    {collection.description}
                  </ReactMarkdown>
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="user">
                    <span>
                      <FaUserCircle />
                    </span>
                    <div className="user-info">
                      <h5>{collection.owner?.username}</h5>
                    </div>
                  </div>
                  <div className="card_btn">
                    <button
                      variant="success"
                      type="submit"
                      className="card_btn"
                      onClick={() =>
                        navigate(`/singleCollection/${collection._id}`)
                      }
                    >
                      {translate("CollectionBtn.View")}
                    </button>
                    <button
                      variant="danger"
                      type="submit"
                      className="card_btn"
                      onClick={() => {
                        userNotAllowed
                          ? userPermission()
                          : deleteCollection(collection._id);
                      }}
                    >
                      {translate("CollectionBtn.Delete")}
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
export default Collections;
