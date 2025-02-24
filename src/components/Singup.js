import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
    const [credential,setCredencial]=useState({name:"", email: "", password:""})
    const {name,email,password}=credential;
    let history=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTgzMjNkOGY5MjMwZjkyZDRiZDBkIn0sImlhdCI6MTcyMDYxNjU3OX0.vWcfpjbBGJEJCY_HXCrNA9dNjXA9Nc-P3UuwMNZQi9s"
            },
            body: JSON.stringify({ name,email,password })
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            history("/login")
            props.showAlert("Account created successfully","success")
          }
          else{
            props.showAlert("invalid credential", "denger")
          }
    }
    const onChange=(e)=>{
        setCredencial({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <h2>Sign Up to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  onChange={onChange}aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Singup
