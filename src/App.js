import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import ReactSwitch from "react-switch";
import Registration from "./components/Registration";
import Login from "./components/Login";
import AdminPage from "./components/Admin/AdminPage";
import SingleCollection from "./components/Admin/SingleCollections";
import SingleItem from "./components/Admin/SingleItem";
import { UserProfile } from "./components/Admin/UserProfile";
export const ThemeContext = createContext(null);

// deployed app url
window.remote_url = "https://itransition-capstone.herokuapp.com";

function App() {
  const [theme, setTheme] = useState("dark");
  const [query, setQuery] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState([]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${window.remote_url}/collections/search?title=${query}`
      );
      const data = await response.json();
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
              <label> {theme === "light" ? "Light" : "Dark"}</label>
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>
            <Link to="/register">
              <Button variant="info" className="rounded-pill mx-2">
                Register
              </Button>
            </Link>
            {isUserLoggedIn ? (
              <div className="d-flex mt-1">
                <BiUserCircle
                  style={{ fontSize: "30px" }}
                  onClick={() => setSmShow(true)}
                />
                <p className="mr-3">{loggedInUserData.username}</p>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="info" className="rounded-pill">Login</Button>
              </Link>
            )}
            <UserProfile smShow={smShow} setSmShow={setSmShow} setIsUserLoggedIn={setIsUserLoggedIn}/>
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path="/adminPage"
            element={<AdminPage setLoggedInUserData={setLoggedInUserData} />}
          />
          <Route
            path="/adminPage/singleCollection/:collectionId"
            element={<SingleCollection />}
          />
          <Route path="/singleItem/:id" element={<SingleItem />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/login"
            element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
