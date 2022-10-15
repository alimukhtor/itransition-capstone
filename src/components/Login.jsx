import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ImSad } from "react-icons/im";
import { BiHappy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isBlocked, setisBlocked] = useState(false);
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);
  const [error, setError] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const value = event.target.value;
    setLogin({
      ...login,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://itransition-capstone.herokuapp.com/users/login", {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const { accessToken } = data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userRole", data.user.role);
        if (response.status === 401) {
          setNotFound(true);
        } else if (data.user.role === 'admin') {
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate("/adminPage");
          }, 2000);
        } else if(response.status === 204) {
          setAllFieldsRequired(true)
        }else if(data.user.role === 'user') {
          navigate("/userPage");
        }
    } catch (error) {
      setError(true)
      console.log("ERROR", error);         
    } 
  };
  return (
    <Container>
      <Row className="main">
        <Col md={6}>
          {notFound ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <MdCancel /> User with this email not found <ImSad />
            </Alert>
          ) : isLoggedIn ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <Spinner animation="grow" variant="success" /> Successfully Logged
              in <BiHappy /> Redirecting to homepage...
            </Alert>
          ) 
          // : isBlocked ? (
          //   <Alert variant="danger" className="rounded-pill mb-5">
          //     <MdCancel /> User account blocked. You cannot log in!
          //   </Alert>
          // ) 
          : error ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <AiOutlineExclamationCircle /> Something really bad happened in server side <ImSad />
            </Alert>
          ) 
          : allFieldsRequired ? (
            <Alert variant="danger" className="rounded-pill mb-5">
            <AiOutlineExclamationCircle /> All fields are required to fill <ImSad />
          </Alert>
          )
          : null
        }
          <Form className="form" onSubmit={handleSubmit}>
            <h3>Log in!</h3>
            <Form.Group className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="rounded-pill input"
                name="email"
                value={login.email}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="rounded-pill input"
                name="password"
                value={login.password}
                onChange={handleInput}
              />
            </Form.Group>
            <Button
              variant="info"
              type="submit"
              className="btn-submit rounded-pill"
            >
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
