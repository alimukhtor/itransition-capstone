import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    const value = event.target.value;
    setRegistration({
      ...registration,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${window.remote_url}/users/register`, {
      method: "POST",
      body: JSON.stringify(registration),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 409) {
      setEmailExist(true);
    } else if (response.status === 204) {
      setIsRegistered(true)
      setTimeout(()=> {
        navigate("/login");

      }, 1000)
    } 
  };
  return (
    <Container>
      <Row className="main-login">
        <Col md={6}>
          {emailExist ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <MdCancel /> User with this email already exist!
            </Alert>
          ) : isRegistered ? (
            <Alert variant="danger" className="rounded-pill mb-5">
              <Spinner animation="grow" variant="success" /> Successfully registered!
              Wait a sec!
            </Alert>
          ) : null
          }
          <Form className="form" onSubmit={handleSubmit}>
            <h3>Create an account</h3>
            <Form.Group className="form-group">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className="rounded-pill input"
                name="username"
                value={registration.username}
                onChange={handleInputs}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="rounded-pill input"
                name="email"
                value={registration.email}
                onChange={handleInputs}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="rounded-pill input"
                name="password"
                value={registration.password}
                onChange={handleInputs}
              />
            </Form.Group>
            <Button
              variant=""
              type="submit"
              className="btn-submit rounded-pill mb-2"
            >
              Sign Up
            </Button>
            <span>
                ______________________Or continue with______________________
              </span>
              <div
                className="d-flex justify-content-center"
                style={{ fontSize: "35px", cursor: "pointer" }}
              >
                <a href="${window.remote_url}/users/googleLogin">
                  <FcGoogle />
                </a>
                <a><FaFacebook className="mx-4" /></a>
                <a><FaTwitter className="text-info" /></a>
              </div>
            <p className="mt-3">Already have an account? <Link to="/login">Sign in</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Registration;
