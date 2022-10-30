import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { createContext, useEffect, useState, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Form, Dropdown } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import ReactSwitch from "react-switch";
import Registration from "./components/Registration/Registration";
import Login from "./components/Registration/Login";
import AdminPage from "./components/Admin/AdminPage";
import SingleCollection from "./components/Admin/collections/SingleCollections";
import SingleItem from "./components/Admin/items/SingleItem";
import { UserProfile } from "./components/Admin/UserProfile";
import { HomePage } from "./components/HomePage";
import { ToastContainer, toast } from "react-toastify";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { translationsEn } from "./components/Admin/Lang/en/en";
import { translationsUz } from "./components/Admin/Lang/uz/uz";
export const ThemeContext = createContext(null);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    uz: { translation: translationsUz },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const onChange = (eventKey) => {
  i18n.changeLanguage(eventKey);
};
// deployed app url
window.remote_url = "https://itransition-capstone.herokuapp.com";
function App() {
  const [customFields, setCustomFields] = useState([]);
  const { t } = useTranslation();
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryFound, setSearchQueryFound] = useState(false);
  const [searchedResult, setSearchedResult] = useState([]);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState([]);
  const [username, setUsername] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const [collections, setCollections] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const username = localStorage.getItem("Username");
    if (username) {
      setIsUserLoggedIn(true);
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    fetchAllCollections();
  }, []);
  
  // toast for unauthorized users
  const userPermission = () => {
    toast.error(t("UserPermission"), {
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
        `${window.remote_url}/items/search?title=${searchQuery}`
      );
      if (response.ok) {
        setSearchQueryFound(true);
        const data = await response.json();
        setSearchedResult(data);
        if (data.length === 0) {
          setSearchQueryFound(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // gets all collections from db
  const fetchAllCollections = async () => {
    const response = await fetch(
      `${window.remote_url}/collections/allCollections`
    );
    if (response.ok) {
      const data = await response.json();
      setCollections(data);
    }
  };

  // get user /me route
  const getUserInfo = async () => {
    const response = await fetch(`${window.remote_url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const user = await response.json();
      setLoggedinUser(user);
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Suspense fallback="loading">
        <div className="App" id={theme}>
          <Navbar variant="dark" className="navbar">
            <Navbar.Brand style={{ cursor: "pointer" }} className="d-flex">
              <span onClick={() => navigate("/adminPage")}>ITRANSITION</span>
              <Dropdown
                className="lang-dropdown mt-n1 ml-2"
                onSelect={onChange}
              >
                <Dropdown.Toggle variant="" className="text-light">
                  <BsGlobe className="text-info" style={{ fontSize: "20px" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu onChange={(e) => console.log(e.target.value)}>
                  <Dropdown.Item href="#/action-1" eventKey="eng">
                    <span className="fi fi-gb"></span> Eng
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" eventKey="uz">
                    <span className="fi fi-uz"></span> Uz
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
            <div>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder={`${t("Search.placeholder")}`}
                  className="mr-1 rounded-pill"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="rounded-pill"
                  onClick={handleSearch}
                >
                  {t("Search.search")}
                </Button>
              </Form>
            </div>
            <Nav>
              <div className="navbar-btns">
                <label>
                  {" "}
                  {theme === "light"
                    ? `${t("SiteMode.Light")}`
                    : `${t("SiteMode.Dark")}`}
                </label>
                <ReactSwitch
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div>
              <Link to="/register">
                <Button variant="" className="mx-2 text-light">
                  {t("Navbar.Register")}
                </Button>
              </Link>
              {isUserLoggedIn ? (
                <div className="d-flex mt-1">
                  <BiUserCircle
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => {
                      getUserInfo();
                      setUserProfileModal(true);
                    }}
                  />
                  <p className="mr-3" style={{ cursor: "pointer" }}>
                    {username}
                  </p>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="" className="text-light">
                    {t("Navbar.Login")}
                  </Button>
                </Link>
              )}
              <UserProfile
                smShow={userProfileModal}
                setSmShow={setUserProfileModal}
                setIsUserLoggedIn={setIsUserLoggedIn}
                loggedinUser={loggedinUser}
                fetchAllCollections={fetchAllCollections}
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
                  searchQueryFound={searchQueryFound}
                  searchedResult={searchedResult}
                  translate={t}
                />
              }
            />
            <Route
              path="/adminPage"
              element={
                <AdminPage
                  t={t}
                  setUserNotAllowed={setUserNotAllowed}
                  userNotAllowed={userNotAllowed}
                  userPermission={userPermission}
                  ToastContainer={ToastContainer}
                  isUserLoggedIn={isUserLoggedIn}
                  setCollections={setCollections}
                  collections={collections}
                  fetchAllCollections={fetchAllCollections}
                  setCustomFields={setCustomFields}
                  customFields={customFields}
                  searchQueryFound={searchQueryFound}
                  searchedResult={searchedResult}
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
                  isUserLoggedIn={isUserLoggedIn}
                  customFields={customFields}
                  setCustomFields={setCustomFields}
                  translate={t}
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
              element={
                <Login
                  setIsUserLoggedIn={setIsUserLoggedIn}
                  setUsername={setUsername}
                />
              }
            />
          </Routes>
        </div>
      </Suspense>
    </ThemeContext.Provider>
  );
}

export default App;
