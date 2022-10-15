import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import AdminPage from "./components/Admin/AdminPage";
import { createContext, useState } from "react";
import UserPage from "./components/User/UserPage";
import SingleCollection from "./components/Admin/SingleCollections";
import SingleItem from "./components/Admin/SingleItem";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useNavigate } from "react-router-dom";
export const ThemeContext = createContext(null);
function App() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Navbar
          variant="dark"
          className="navbar d-flex justify-content space-between"
        >
          <Navbar.Brand
            onClick={() =>
              userRole === "admin"
                ? navigate("/adminPage")
                : navigate("/userPage")
            }
          >
            ITRANSITION
            <RiLeafFill className="mb-2 ml-1" />
          </Navbar.Brand>
          <div className="">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search everything"
                className="mr-1 rounded-pill"
                aria-label="Search"
              />
              <Button variant="outline-success" className="rounded-pill">
                Search
              </Button>
            </Form>
          </div>
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
        <Routes>
          <Route path="/adminPage" element={<AdminPage />} />
          <Route
            path="/adminPage/singleCollection/:id"
            element={<SingleCollection />}
          />
          <Route path="/singleItem/:id" element={<SingleItem />} />
          <Route path="/userPage" element={<UserPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
