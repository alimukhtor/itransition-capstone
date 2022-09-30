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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBlocked, setisBlocked] = useState(false);
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
        const response = await fetch("http://localhost:3030/users/login", {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        const { accessToken } = data;
        localStorage.setItem("token", accessToken);
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 200) {
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
    } catch (error) {
        console.log(error);         
    } 
  };
  return (
    <Container>
      <Row className="main">
        <Col md={6}>
          {notFound ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <MdCancel /> User with this email not found!
            </Alert>
          ) : isLoggedIn ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <Spinner animation="grow" variant="success" /> Successfully Logged
              in :) Redirecting to homepage...
            </Alert>
          ) 
          : isBlocked ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <MdCancel /> User account blocked. You cannot log in!
            </Alert>
          ) 
          : null}
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
              variant=""
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
