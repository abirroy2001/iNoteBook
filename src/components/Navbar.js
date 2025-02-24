import React from 'react'
import { Link,useLocation , useNavigate} from 'react-router-dom'
const Navbar = () => {
  let location = useLocation();
  let history=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ content:'screenLeft'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{position: 'absolute', left:"110px"}}>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/' ? 'active':""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about' ? 'active':""}` } to="/about">About</Link>
        </li>
        
        
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex" role="search" style={{ position:'absolute', right: '20px'}}>
        <Link className="btn btn-primary mx-1" to="/Login" role="button">Log in</Link>
        <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign up</Link>
      </form>:<button onClick={handleLogout} className="btn btn-primary mx-2" style={{ position:'absolute', right: '20px'}}>Log Out</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
