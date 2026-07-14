import axios from 'axios';
import React, { useRef } from 'react'
import { API_URL } from '../services/apiService';

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();

  const onSub = async (e) => {
    e.preventDefault()
    const body = {
      email: emailRef.current.value,
      password: passRef.current.value
    }
    console.log(body);
    try {
      const resp = await axios(
        {
          method: "POST",
          url: API_URL + "/users/login",
          data: body
        }
      )
      if(resp.data.token){
        localStorage.setItem("token",resp.data.token)
      }
      console.log(resp.data)
    }
    catch(err){
      console.log(err)
      alert(err.response.data.msg)
    }
   

  }

  return (
    <div className='container'>
      <h2>Log in user:</h2>
      <form onSubmit={onSub} className='col-4'>
        <label>Email:</label>
        <input ref={emailRef} type="text" className='form-control' />
        <label>Password</label>
        <input type="password" ref={passRef} className='form-control' />
        <button className='btn btn-info my-3'>Log in</button>
      </form>
    </div>
  )
}
