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
export const ThemeContext = createContext(null);

// deployed app url
window.remote_url = "https://itransition-capstone.herokuapp.com"

function App() {
  const [theme, setTheme] = useState("dark");
  const [query, setQuery] = useState("");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${window.remote_url}/collections/search?title=${query}`
      );
      const data = await response.json();
      console.log("SEARCHED RESULT", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Navbar
          variant="dark"
          className="navbar d-flex justify-content space-between"
        >
          <Navbar.Brand>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant="outline-success"
                className="rounded-pill"
                onClick={handleSearch}
              >
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
            path="/adminPage/singleCollection/:collectionId"
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
