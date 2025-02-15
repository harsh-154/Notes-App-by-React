import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  let navigate=useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitButton=async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/add`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      const textResponse = await response.text(); 
      try {
        const json = JSON.parse(textResponse);
        console.log("Parsed Response:", json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
        } else {
            alert(json.error);
        }
    } catch (error) {
        console.log("Error parsing JSON:", error);
        console.log("Received response:", textResponse);
    }
    
}
  return (
    <>
    <div className="container">
    <div className="mt-3">
      <h2>Sign Up to create a new account</h2>
      <form onSubmit={submitButton}>
        <div className="mb-3 my-3">
          <label className='form-label'>Full Name</label>
          <input type='text' className='form-control' id="name" name="name" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
    </>
  )
}

export default SignUp
