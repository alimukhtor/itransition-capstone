import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { RiLeafFill } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import ReactSwitch from "react-switch";
import Registration from "./components/Registration/Registration";
import Login from "./components/Registration/Login";
import AdminPage from "./components/Admin/AdminPage";
import SingleCollection from "./components/Admin/collections/SingleCollections";
import SingleItem from "./components/Admin/items/SingleItem";
import { UserProfile } from "./components/Admin/UserProfile";
import { HomePage } from "./components/HomePage";
import { ToastContainer, toast } from "react-toastify";
export const ThemeContext = createContext(null);

// deployed app url
window.remote_url = "https://itransition-capstone.herokuapp.com";

function App() {
  const [theme, setTheme] = useState("dark");
  const [query, setQuery] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [username, setUsername] = useState('')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('Username')
    if(username) {
      setIsUserLoggedIn(true)
      setUsername(username)
    }
  }, [])

  // toast for unauthorized users
  const userPermission = () => {
    toast.error("You are not allowed. Please register first", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // searche engine to display anything in the collection 
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
          <Navbar.Brand
            onClick={() => navigate("/adminPage")}
            style={{ cursor: "pointer" }}
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
                <p className="mr-3">{username}</p>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="info" className="rounded-pill">
                  Log in
                </Button>
              </Link>
            )}
            <UserProfile
              smShow={smShow}
              setSmShow={setSmShow}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setUserNotAllowed={setUserNotAllowed}
                userNotAllowed={userNotAllowed}
                userPermission={userPermission}
                ToastContainer={ToastContainer}
                setCollections={setCollections}
                collections={collections}
              />
            }
          />
          <Route
            path="/adminPage"
            element={
              <AdminPage
                setUserNotAllowed={setUserNotAllowed}
                userNotAllowed={userNotAllowed}
                userPermission={userPermission}
                ToastContainer={ToastContainer}
                isUserLoggedIn={isUserLoggedIn}
                setCollections={setCollections}
                collections={collections}
              />
            }
          />
          <Route
            path="/singleCollection/:collectionId"
            element={
              <SingleCollection
                setUserNotAllowed={setUserNotAllowed}
                userNotAllowed={userNotAllowed}
                userPermission={userPermission}
                ToastContainer={ToastContainer}
              />
            }
          />
          <Route
            path="/singleItem/:id"
            element={
              <SingleItem
                setUserNotAllowed={setUserNotAllowed}
                userNotAllowed={userNotAllowed}
              />
            }
          />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/login"
            element={<Login setIsUserLoggedIn={setIsUserLoggedIn} setUsername={setUsername} />}
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
