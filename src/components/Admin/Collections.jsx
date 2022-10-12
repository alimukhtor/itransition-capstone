import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css";
const Collections = () => {
  const [collections, setCollections] = useState([]);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetchUsers();
  }, [setCollections]);
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
    console.log("Collections", data);
  };

  console.log("Col", collections);
  return (
    <Row>
      {collections.map((collection) => (
        <Col md={6} lg={3} className="">
          <Card className="card">
            <Link to={`singleCollection/${collection._id}`}>
            <Card.Img variant="top" src={collection.image} />
            <Card.Body className="card_body">
              <Card.Title>{collection.name}</Card.Title>
              <Card.Text className="text-light">
                {collection.description}
              </Card.Text>
              <Button variant="success">Go somewhere</Button>
            </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default Collections;
