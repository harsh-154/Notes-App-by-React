import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Home from './components/Home';
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BookmarkState from './context/bookmarks/bookmarkState';
import Bookmarks from './components/Bookmarks';
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  return (
    <>
      <NoteState>
        <BookmarkState>
          <Router>
            <Navbar />
            {alertMsg && <Alert msg={alertMsg} type={alertType} />}
            <Routes>
              <Route exact path='/about' element={<About/>}></Route>
              <Route
                exact
                path="/docs"
                element={
                  <ProtectedRoute>
                    <Home setAlertMsg={setAlertMsg} setAlertType={setAlertType} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <Bookmarks setAlertMsg={setAlertMsg} setAlertType={setAlertType} />
                  </ProtectedRoute>
                }
              />
              <Route exact path='/login' element={<Login setAlertMsg={setAlertMsg} setAlertType={setAlertType} />}></Route>
              <Route exact path='/signup' element={<SignUp setAlertMsg={setAlertMsg} setAlertType={setAlertType} />}></Route>
            </Routes>
          </Router>
        </BookmarkState>
      </NoteState>
    </>
  );
}

export default App;
