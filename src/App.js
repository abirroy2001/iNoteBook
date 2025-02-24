import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';
import { useState } from 'react';
function App() {
  const[alert, setAlert]=useState(null);
  const showAlert=(massege,type)=>{
    setAlert(
      {
        msg: massege,
        type: type
      }
    )
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
            <Route exact path="/about" element={<About />} />
               
            <Route exact path="/" element={<Home showAlert={showAlert} />} />

            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />

            <Route exact path="/Signup" element={<Singup showAlert={showAlert}/>} />
             
            </Routes>
            
          </div>
        </Router>
    </NoteState>
    </>
  );
}

export default App;
