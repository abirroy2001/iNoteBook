import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login =  (props) => {
    const [credential,setCredencial]=useState({email: "", password:""})
    let history=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZTgzMjNkOGY5MjMwZjkyZDRiZDBkIn0sImlhdCI6MTcyMDYxNjU3OX0.vWcfpjbBGJEJCY_HXCrNA9dNjXA9Nc-P3UuwMNZQi9s"
            },
            body: JSON.stringify({email: credential.email,password:credential.password })
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Logged in successfully","success")
          }
          else{
            props.showAlert("invalid Details", "denger")
          }
    }
    const onChange=(e)=>{
        setCredencial({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <h2>Log In to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credential.password} name='password' onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
