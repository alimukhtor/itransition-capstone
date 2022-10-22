import "../../App.css";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const Collections = () => {
  const [collections, setCollections] = useState([]);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  // gets all colections
  useEffect(() => {
    const fetchAllCollections = async () => {
      const response = await fetch(
        `${window.remote_url}/collections/allCollections`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setCollections(data);
    };
    fetchAllCollections();
  }, []);

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
      const restCollections = collections.filter((c) => c._id !== id);
      setCollections(restCollections);
    }
  };

  return (
    <Row>
      {collections.map((collection) => (
        <Col xs={12} md={6} lg={3} key={collection._id} className="p-4">
          <Card className="card border-0 h-100">
            <Card.Img src={collection.image} className="card_img" />
            <Card.Body className="card_body">
              <span class="tag tag-teal">{collection.topic}</span>
              <Card.Title className="title">
                {collection.name}
              </Card.Title>
              <Card.Text className="text">{collection.description}</Card.Text>
              <div className="d-flex justify-content-center">
                <div className="user">
                  <span>
                    <FaUserCircle />
                  </span>
                  <div className="user-info">
                    <h5>{collection.owner.username}</h5>
                  </div>
                </div>
                <div className="card_btn">
                  <button
                    variant="success"
                    type="submit"
                    className="card_btn"
                    onClick={() =>
                      navigate(`singleCollection/${collection._id}`)
                    }
                  >
                    view
                  </button>
                  <button
                    variant="danger"
                    type="submit"
                    className="card_btn"
                    onClick={() => deleteCollection(collection._id)}
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
  );
};
export default Collections;
