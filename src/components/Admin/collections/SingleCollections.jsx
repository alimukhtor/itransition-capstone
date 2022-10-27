import "../../../App.css";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Toast,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { AiFillWarning } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FetchComments } from "../items/FetchComments";
import { CreateItem } from "../items/CreateItem";
import { GrEdit } from "react-icons/gr";
import { UpdateSingleItem } from "../items/UpdateSingleItem";

const SingleCollection = ({
  userNotAllowed,
  setUserNotAllowed,
  userPermission,
  ToastContainer,
  isUserLoggedIn,
}) => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [singleItem, setSingleItem] = useState(null);
  const [text, setText] = useState("");
  const [itemNotFound, setItemNotFound] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const handleCloseUpdateItemModal = () => setShowUpdateItemModal(false);
  const handleShowUpdateItemModal = () => setShowUpdateItemModal(true);

  const navigate = useNavigate();
  const toggleShowComment = () => setShowCommentSection(!showCommentSection);
  const { collectionId } = useParams();
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");
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
    } else if (response.status === 401) {
      setUserNotAllowed(true);
    }
  };

  // adds like by authorized user
  const addLike = async (itemId) => {
    const response = await fetch(
      `${window.remote_url}/items/${itemId}/like`,
      {
        method: "PUT",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response
    console.log(data);
    if (response.ok) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
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

  const getSingleItem = async (selectedItemId) => {
    const response = await fetch(
      `${window.remote_url}/items/${selectedItemId}`
    );
    if (response.ok) {
      const item = await response.json();
      setSingleItem(item);
    }
  };

  return (
    <Container fluid>
      {userNotAllowed ? (
        <Alert variant="danger" className="rounded-pill text-center">
          <AiFillWarning />
          You are not allowed. Please register <Link to="/register">here</Link>
        </Alert>
      ) : null}
      <Row className="p-3">
        {isUserLoggedIn ? (
          <Button
            onClick={() => setModalShow(true)}
            variant="success"
            className="ml-auto rounded-pill"
          >
            <FiPlusCircle style={{ fontSize: "25px" }} /> Create item
          </Button>
        ) : null}
      </Row>
      <Row className="p-5 justify-content-center text-center">
        {itemNotFound ? (
          <h1 className="text-info d-flex">
            <AiFillWarning className="text-danger" />
            Collection does not have item.{" "}
            {isUserLoggedIn ? (
              <>
                <p className="mr-2">Let's create</p>
                <Link onClick={() => setModalShow(true)}>here</Link>
              </>
            ) : null}
          </h1>
        ) : null}

        {items.map((item) => (
          <Col xs={12} md={4} lg={2} key={item._id}>
            <Card className="card border-0 h-100">
              <Card.Img variant="top" src={item.image} className="card_img" />
              <Card.Body className="card_body">
                <span className="tag tag-teal">{item.topic}</span>
                <span
                  className="edit-collection"
                  onClick={() => {
                    handleShowUpdateItemModal();
                    getSingleItem(item._id);
                  }}
                >
                  <GrEdit />
                </span>
                <UpdateSingleItem
                  showUpdateItemModal={showUpdateItemModal}
                  setShowUpdateItemModal={setShowUpdateItemModal}
                  handleCloseUpdateItemModal={handleCloseUpdateItemModal}
                  singleItem={singleItem}
                  setSingleItem={setSingleItem}
                  fetchSingleCollection={fetchSingleCollection}
                  setUserNotAllowed={setUserNotAllowed}
                  userNotAllowed={userNotAllowed}
                  userPermission={userPermission}
                />
                <Card.Title className="title">{item.name}</Card.Title>
                <Card.Text className="text">{item.description}</Card.Text>
                <div className="item-section">
                  <div>
                    <span onClick={() => addLike(item._id)}>
                      {isLiked ? <AiFillLike className="text-danger"/> : <AiOutlineLike />}
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
                    placeholder="Leave your thoughts here..."
                  />
                  <FetchComments
                    itemId={item._id}
                    setShowCommentSection={setShowCommentSection}
                    showCommentSection={showCommentSection}
                    userNotAllowed={userNotAllowed}
                    setUserNotAllowed={setUserNotAllowed}
                    userPermission={userPermission}
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
          fetchSingleCollection={fetchSingleCollection}
          setInputTag={setTags}
          inputTag={tags}
        />
      </Row>
    </Container>
  );
};
export default SingleCollection;
