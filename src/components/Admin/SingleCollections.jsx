import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import "../../App.css";
const SingleCollection = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showA, setShowA] = useState(true);
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
    console.log("ID",id);
    if (event.key === 'Enter') {
      const response = await fetch(
        `https://itransition-capstone.herokuapp.com/items/${id}/comments`,
        {
          method: "POST",
          body: JSON.stringify({text}),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      );
      if(response.ok){
        const data = await response.json()
        console.log("COMMENT",data);
        setText('')
      }
    }
  };
  return (
    <Row className="p-5">
      {items.map((item) => (
        <Col xs={12} md={4} lg={2} key={item._id}>
          <Card className="card border-0 h-100">
            {/* <Link to={`singleItem/${item._id}`}> */}
            <Card.Img variant="top" src={item.image} className="card_img" />
            <Card.Body className="card_body">
              <span class="tag tag-teal">{item.topic}</span>
              <Card.Title className="title">{item.name} collection</Card.Title>
              <Card.Text className="text">{item.description}</Card.Text>
              <div className="d-flex">
                <div className="item-tools">
                  {isLiked ? (
                    <span>
                      <AiOutlineHeart onClick={() => setIsLiked(!isLiked)} />
                    </span>
                  ) : (
                    <AiFillHeart
                      className="text-danger"
                      onClick={() => setIsLiked(!isLiked)}
                    />
                  )}
                  <span>
                    <GoComment onClick={toggleShowA} />
                  </span>
                </div>
                <Button variant="success" className="ml-auto">
                  See more
                </Button>
              </div>
            </Card.Body>
            {/* </Link> */}
            <Toast show={showA} onClose={toggleShowA} className="comment-toast">
              <Toast.Body>
                <Form.Control
                  value={text}
                  onChange={(e)=> setText(e.target.value)}
                  onKeyDown={(e)=> postComment(e, item._id)}
                  size="sm"
                  type="text"
                  placeholder="Leave a comment..."
                />
              </Toast.Body>
            </Toast>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default SingleCollection;
