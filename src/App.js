import { Link, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/esm/Container";
import './App.css';

import Pages from "./pages/Pages";
import Navbar from "./Components/Navbar"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import page from './Components/images/page-background.png'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<div className="background"><img src={page} height='auto'/></div>} />
      <Route path="/customize" element={<div className="background"><img src={page} height='auto'/></div>} />
    </Routes>
    <div>
      <div  className='navStick'>
        <Navbar className='bar-color-dark' name='Navbar' links={[
          <Link to="/"><button>Front Page</button></Link>,
          <Link to="/customize"><button>Your Team</button></Link>,
          <Link to="/data/characters"><button>Data</button></Link>]}>
        </Navbar>
      </div> 
      <div className="underNav">
        <Pages/> <br></br>
      </div>
    
    </div>
    </>
  )
}

export default App;
