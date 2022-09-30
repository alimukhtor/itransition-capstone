import { Navbar, Nav, Button } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import "../styles/index.css";
const MyNavbar = () => {
  return (
    <Navbar variant="dark" className="navbar">
      <Navbar.Brand href="#home">
        ITRANSITION
        <RiLeafFill className="mb-2 ml-1" />
      </Navbar.Brand>
      <Nav className="ml-auto">
        <div className="navbar-btns">
          <Link to="/register">
            <Button variant="">Register</Button>
          </Link>
          <Link to="login">
            <Button variant="">Login</Button>
          </Link>
        </div>
      </Nav>
    </Navbar>
  );
};
export default MyNavbar;
