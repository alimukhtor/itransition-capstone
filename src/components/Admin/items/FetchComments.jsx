import "../../../App.css";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
export const FetchComments = ({
  itemId,
  setShowCommentSection,
  showCommentSection,
  setUserNotAllowed,
}) => {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchComments();
  }, []);

  // fetches all comments for specific item
  const fetchComments = async () => {
    const response = await fetch(
      `${window.remote_url}/items/${itemId}/comments`
    );
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }else if(response.status === 401){
      setUserNotAllowed(true)
    }
  };

  // deletes single comment of specific item
  const deleteComment = async (commentId) => {
    const response = await fetch(
      `${window.remote_url}/items/${itemId}/comments/${commentId}`,
      {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const filteredComment = comments.filter((c) => c._id !== commentId);
      setShowCommentSection(!showCommentSection);
      setComments(filteredComment);
    }
  };

  return (
    <>
      {comments.map((comment, i) => (
        <div className="comment-owner" key={i}>
          <span>
            <FaUserCircle />
          </span>
          <div className="owner_info">
            {comment.owner.map((user) => (
              <p>{user.username}</p>
            ))}
            <p>{comment.text}</p>
          </div>
          <span onClick={() => deleteComment(comment._id)}>
            <BiTrash />
          </span>
        </div>
      ))}
    </>
  );
};
