import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../../App.css";
const SingleItem = () => {
  const [item, setItem] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchItemDetails();
  }, []);
  const fetchItemDetails = async () => {
    const response = await fetch(
      `https://itransition-capstone.herokuapp.com/items/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    setItem(data);
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch(
      `https://itransition-capstone.herokuapp.com/items/${id}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
      console.log("COMMENTS", data);
    }
  };
  return (
    <Container className="main-section">
      <Row className="d-flex justify-content space-between p-5">
        <Col md={7} className="section-2">
          <img src={item.image} alt="item-img" />
        </Col>
        <Col md={5} className="section-3">
          <Form>
            <strong><h2>{item.name}</h2></strong>
            <h3>{item.topic}</h3>
            <p>{item.description}</p>
            <strong><h4 className="text-left mt-4">Comments</h4></strong>
            {comments.map((comment) => (
              <div className="author">
                <div className="author-detail">
                  <span><FaUserCircle /></span>
                  {comment.owner.map((user) => (
                    <p>{user.username}</p>
                  ))}
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default SingleItem;
