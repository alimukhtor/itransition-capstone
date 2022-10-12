import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MyNavbar from './components/MyNavbar';
import Registration from './components/Registration';
import Login from './components/Login';
import AdminPage from './components/Admin/AdminPage';
import { createContext, useState } from "react";
import UserPage from './components/User/UserPage';
import SingleCollection from './components/Admin/SingleCollections';
export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="App" id={theme}>
      <BrowserRouter>
      <MyNavbar theme={theme} toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/adminPage" element={<AdminPage />}/>
          <Route path="/adminPage/singleCollection/:id" element={<SingleCollection />}/>
          <Route path="/userPage" element={<UserPage />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
