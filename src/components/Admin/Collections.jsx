import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../../App.css";
const Collections = () => {
  const [collections, setCollections] = useState([]);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  // gets all colections
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://itransition-capstone.herokuapp.com/collections/allCollections",
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
    fetchUsers();
  }, []);

  // deletes single collection by id 
  const deleteCollection = async (id) => {
    const response = await fetch(
      `https://itransition-capstone.herokuapp.com/collections/${id}/deleteCollection`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if(response.ok){
      const restCollections = collections.filter(c => c._id !== id);  
      setCollections(restCollections)
    }
  };

  return (
    <Row>
      {collections.map((collection) => (
        <Col xs={12} md={5} lg={3} key={collection._id} className="p-4">
          <Card className="card border-0 h-100">
            <Card.Img
              variant="top"
              src={collection.image}
              className="card_img"
            />
            <Card.Body className="card_body">
              <span class="tag tag-teal">{collection.topic}</span>
              <Card.Title className="title">
                {collection.name} collection
              </Card.Title>
              <Card.Text className="text">{collection.description}</Card.Text>
              <div className="d-flex">
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
