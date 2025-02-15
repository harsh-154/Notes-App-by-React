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
function App() {
  
  return (
    <>
      <NoteState>

     <Router>
     <Navbar/>
     <Alert msg="Successfully deleted"/>
      <Routes>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/docs' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<SignUp/>}></Route>
      </Routes>
     </Router>
      </NoteState>
    </>
  );
}

export default App;
