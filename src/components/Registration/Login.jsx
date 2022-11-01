import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { ImSad } from "react-icons/im";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = ({ setIsUserLoggedIn, setUsername, translate }) => {
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [isBlocked, setisBlocked] = useState(false);
  const [allFieldsRequired, setAllFieldsRequired] = useState(false);
  const [error, setError] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // toast for successfully logged in users
  const successMsgForLoggedinUser = () => {
    toast.success(translate("UserRegistration.SuccessMsgForlogin"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleInput = (event) => {
    const value = event.target.value;
    setLogin({
      ...login,
      [event.target.name]: value,
    });
  };

  // submits user credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${window.remote_url}/users/login`, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.accessToken.accessToken);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("Username", data.user.username);
      if (
        response.status === 200
        // (
        // && data.user.role === "admin") ||
        // data.user.role === "user"
      ) {
        setIsUserLoggedIn(true);
        setUsername(data.user.username);
        navigate("/adminPage");
      } else if (response.status === 401) {
        setNotFound(true);
      } else if (data.user.status === "blocked") {
        setisBlocked(true);
        navigate("/register");
      } else if (response.status === 204) {
        setAllFieldsRequired(true);
      }
    } catch (error) {
      setError(true);
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <Container>
        <Row className="main-login">
          <Col md={6}>
            {notFound ? (
              <Alert variant="danger" className="rounded-pill mb-5">
                <MdCancel /> {translate("UserRegistration.NotFoundMsg")}
                <ImSad />
              </Alert>
            ) : isBlocked ? (
              <Alert variant="danger" className="rounded-pill mb-5">
                <MdCancel /> {translate("UserRegistration.BlockedMsg")}
              </Alert>
            ) : error ? (
              <Alert variant="danger" className="rounded-pill mb-5">
                <AiOutlineExclamationCircle />{" "}
                {translate("UserRegistration.ServerMsg")} <ImSad />
              </Alert>
            ) : allFieldsRequired ? (
              <Alert variant="danger" className="rounded-pill mb-5">
                <AiOutlineExclamationCircle />{" "}
                {translate("UserRegistration.AllFieldsMsg")}
                <ImSad />
              </Alert>
            ) : null}
            <Form className="form" onSubmit={handleSubmit}>
              <h3>{translate("UserRegistration.Login")}</h3>
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
                <Form.Label>
                  {translate("UserRegistration.Password")}
                </Form.Label>
                <Form.Control
                  type="password"
                  className="rounded-pill input"
                  name="password"
                  value={login.password}
                  onChange={handleInput}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="info"
                className="btn-submit rounded-pill mb-3"
                onClick={successMsgForLoggedinUser}
              >
                {translate("UserRegistration.Login")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
