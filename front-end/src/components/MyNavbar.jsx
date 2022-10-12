import { Navbar, Nav, Button } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";

import "../styles/index.css";
const MyNavbar = ({ theme, toggleTheme }) => {
  return (
    <Navbar variant="dark" className="navbar">
      <Navbar.Brand href="#home">
        ITRANSITION
        <RiLeafFill className="mb-2 ml-1" />
      </Navbar.Brand>
      <Nav className="ml-auto">
        <div className="navbar-btns">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
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
