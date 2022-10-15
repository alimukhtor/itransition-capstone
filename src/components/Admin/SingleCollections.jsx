import "../../App.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner, Toast } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { FiThumbsUp } from "react-icons/fi";
import { FetchComments } from "./FetchComments";
const SingleCollection = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showA, setShowA] = useState(true);
  const navigate = useNavigate();
  const toggleShowA = () => setShowA(!showA);
  const { id } = useParams();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    fetchSingleCollection();
  }, []);

  const fetchSingleCollection = async () => {
    const response = await fetch(
      `https://itransition-capstone.herokuapp.com/collections/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    setItems(data.items);
  };

  const postComment = async (event, id) => {
    if (event.key === "Enter") {
      const response = await fetch(
        `https://itransition-capstone.herokuapp.com/items/${id}/comments`,
        {
          method: "POST",
          body: JSON.stringify({ text }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        setText("");
      }
    }
  };

 

  return (
    <Row className="p-5">
      {items.map((item) => (
        <Col xs={12} md={4} lg={2} key={item._id}>
          <Card className="card border-0 h-100">
            <Card.Img variant="top" src={item.image} className="card_img" />
            <Card.Body className="card_body">
              <span class="tag tag-teal">{item.topic}</span>
              <Card.Title className="title">{item.name} collection</Card.Title>
              <Card.Text className="text">{item.description}</Card.Text>
              <div className="item-section">
                <div><FiThumbsUp /></div>
                <div><GoComment onClick={toggleShowA} /></div>
                <Button
                  className="rounded-pill"
                  variant="success"
                  onClick={() => navigate(`/singleItem/${item._id}`)}
                >
                  See more
                </Button>
              </div>
            </Card.Body>
            <Toast show={!showA} onClose={toggleShowA} className="comment-toast">
              <Toast.Body>
                <Form.Control
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => postComment(e, item._id)}
                  size="sm"
                  type="text"
                  className="rounded-pill"
                  placeholder="Leave a comment..."
                />
                <FetchComments itemId={item._id}/>
              </Toast.Body>
            </Toast>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default SingleCollection;
