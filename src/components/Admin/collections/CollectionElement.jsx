import { Card, Toast, Form } from "react-bootstrap";
import { GoComment } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FetchComments } from "../items/FetchComments";
import { GrEdit } from "react-icons/gr";
import { UpdateSingleItem } from "../items/UpdateSingleItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CollectionElement = ({
  items,
  setItems,
  setUserNotAllowed,
  item,
  fetchSingleCollection,
  userNotAllowed,
  userPermission,
  translate,
}) => {
  const token = window.localStorage.getItem("token");
  const [showCommentSection, setShowCommentSection] = useState(true);

  const [text, setText] = useState("");

  const navigate = useNavigate();
  const toggleShowComment = () => setShowCommentSection(!showCommentSection);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const handleCloseUpdateItemModal = () => setShowUpdateItemModal(false);
  const handleShowUpdateItemModal = () => setShowUpdateItemModal(true);
  const [singleItem, setSingleItem] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

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
      `${window.remote_url}/items/${itemId}/add-like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      setIsLiked(true);
    }
  };

  // removes like by authorized user
  const removeLike = async (itemId) => {
    const response = await fetch(
      `${window.remote_url}/items/${itemId}/remove-like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
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
    <Card className="card border-0 h-100">
      <Card.Img variant="top" src={item.image} className="card_img" />
      <Card.Body className="card_body">
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
          translate={translate}
        />
        <Card.Title className="title mt-2">{item.name}</Card.Title>
        <div className="item-section">
          <div>
            <span
              onClick={() =>
                isLiked ? removeLike(item._id) : addLike(item._id)
              }
            >
              {isLiked ? (
                <AiFillLike className="text-danger" />
              ) : (
                <AiOutlineLike />
              )}
            </span>
            <span>
              <GoComment onClick={toggleShowComment} />
            </span>
          </div>
          <div className="item_btns">
            <button onClick={() => deleteItem(item._id)}>
              {translate("ItemBtn.Delete")}
            </button>
            <button onClick={() => navigate(`/singleItem/${item._id}`)}>
              {translate("ItemBtn.View")}
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
  );
};

export default CollectionElement;
