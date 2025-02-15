import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    let navigate = useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""});
    const submitButton=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const textResponse = await response.text(); // Read response as text
          try {
            const json = JSON.parse(textResponse);
            console.log("Parsed Response:", json);
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("/docs");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log("Error parsing JSON:", error);
            console.log("Received response:", textResponse);
        }
        
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    return (
        <>
        <div className="container mt-3">
            <h2>Login to continue</h2>
            <form  onSubmit={submitButton}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="exampleInputPassword1" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    )
}

export default Login
