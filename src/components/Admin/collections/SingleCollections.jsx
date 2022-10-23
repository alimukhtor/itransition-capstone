import "../../../App.css";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Toast,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { AiFillWarning } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FetchComments } from "../items/FetchComments";
import { CreateItem } from "../items/CreateItem";

const SingleCollection = ({userNotAllowed, setUserNotAllowed}) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [itemNotFound, setItemNotFound] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const toggleShowComment = () => setShowCommentSection(!showCommentSection);
  const { collectionId } = useParams();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    fetchSingleCollection();
  }, []);

  // fetches single collection by id
  const fetchSingleCollection = async () => {
    const response = await fetch(
      `${window.remote_url}/collections/${collectionId}`
    );
    const data = await response.json();
    setItems(data.items);
    if (data.items.length === 0) {
      setItemNotFound(true);
    }
  };

  // deletes single item
  const deleteItem = async (itemId) => {
    const response = await fetch(`${window.remote_url}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const restItems = items.filter((c) => c._id !== itemId);
      setItems(restItems);
    }else if(response.status === 401){
      setUserNotAllowed(true)
    }
  };
  // posts comment for specific item
  const postComment = async (event, id) => {
    if (event.key === "Enter") {
      setShowCommentSection(!showCommentSection);
      const response = await fetch(
        `${window.remote_url}/items/${id}/comments`,
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
      } else if (response.status === 401) {
        setUserNotAllowed(true);
      }
    }
  };

  return (
    <Container fluid>
      {userNotAllowed ? (
        <Alert variant="danger" className="text-center">
          <AiFillWarning style={{ fontSize: "25px" }} /> You are not allowed. Please register first <Link to="/register">here</Link>
        </Alert>
      ) : null}
      <Row className="p-3">
        <Button
          onClick={() => setModalShow(true)}
          variant="success"
          className="ml-auto rounded-pill"
        >
          <FiPlusCircle style={{ fontSize: "25px" }} /> Create item
        </Button>
      </Row>
      <Row className="p-5">
        {itemNotFound ? (
          <h1 className="text-info">
            Collection does not have items currently{" "}
            <AiFillWarning className="text-danger" />
          </h1>
        ) : null}

        {items.map((item) => (
          <Col xs={12} md={4} lg={2} key={item._id}>
            <Card className="card border-0 h-100">
              <Card.Img variant="top" src={item.image} className="card_img" />
              <Card.Body className="card_body">
                <span class="tag tag-teal">{item.topic}</span>
                <Card.Title className="title">{item.name}</Card.Title>
                <Card.Text className="text">{item.description}</Card.Text>
                <div className="item-section">
                  <div>
                    <span>
                      <FiThumbsUp />
                    </span>
                    <span>
                      <GoComment onClick={toggleShowComment} />
                    </span>
                  </div>
                  <div className="item_btns">
                    <button onClick={() => deleteItem(item._id)}>delete</button>
                    <button onClick={() => navigate(`/singleItem/${item._id}`)}>
                      view
                    </button>
                  </div>
                </div>
              </Card.Body>
              <Toast
                show={!showCommentSection}
                onClose={toggleShowComment}
                className="comment-toast"
              >
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
                  <FetchComments
                    itemId={item._id}
                    setShowCommentSection={setShowCommentSection}
                    showCommentSection={showCommentSection}
                    userNotAllowed={userNotAllowed}
                    setUserNotAllowed={setUserNotAllowed}
                  />
                </Toast.Body>
              </Toast>
            </Card>
          </Col>
        ))}
        <CreateItem
          show={modalShow}
          onHide={() => setModalShow(false)}
          collectionId={collectionId}
          setModalShow={setModalShow}
          items={items}
          setItems={setItems}
        />
      </Row>
    </Container>
  );
};
export default SingleCollection;
