import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../../../App.css";
const SingleItem = () => {
  const [item, setItem] = useState();
  const [comments, setComments] = useState([]);
  const [noComment, setNoComment] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    const response = await fetch(`${window.remote_url}/items/${id}`);
    if(response.ok){
      const data = await response.json();
      if (data.comments.length === 0) setNoComment(true);
      console.log("DETAIL", data);
      setItem(data);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch(`${window.remote_url}/items/${id}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };
  return (
    <Row className="p-5">
      <Col className="section-3">
        <div>
          <img src={item?.image} alt="item-img" />
          <div className="d-flex">
            {
              item?.tags.map(tag=> (
                <p className="mx-1">#{tag?.text}</p>
              ))
            }
          </div>
        </div>
        <Form>
          <h3>{item?.name}</h3>
          <hr/>
          <strong><p>About this item</p></strong>
          {noComment ? (
            <p className="text-center mt-4">No Comments</p>
          ) : (
            <p className="text-center mt-4">Comments</p>
          )}
          {comments.map((comment) => (
            <div className="">
              <div className="d-flex">
                <span className="mr-1"><FaUserCircle /></span>
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
  );
};
export default SingleItem;
