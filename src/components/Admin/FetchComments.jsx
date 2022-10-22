import "../../App.css";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
export const FetchComments = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchComments();
  }, []);

  // fetches all comments for specific item
  const fetchComments = async () => {
    const response = await fetch(
      `${window.remote_url}/items/${itemId}/comments`,
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
    if(response.ok){
      const filteredComment = comments.filter(c => c._id !== commentId);  
      setComments(filteredComment)
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <div className="owner">
          <span><FaUserCircle /></span>
          <div className="owner_info">
            {comment.owner.map((user) => (
              <p>{user.username}</p>
            ))}
            <p>{comment.text}</p>
          </div>
          <span onClick={()=> deleteComment(comment._id)}><BiTrash /></span>
        </div>
      ))}
    </>
  );
};
