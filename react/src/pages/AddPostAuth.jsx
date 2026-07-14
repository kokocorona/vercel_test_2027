import axios from 'axios';
import React, { useRef } from 'react'
import { API_URL } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function AddPostAuth() {
  // משתנים שידברו עם האלמנטים של האינפוט
  // כדי לאסוף את המידע של המשתמש
  const titleRef = useRef();
  const infoRef = useRef();
  // nav- מאפשר לשגר את המשתמש לכתובת דרך הג'יי אס
  const nav = useNavigate()

  const onSub = async (e) => {
    // מונע שיגור של טופס ורפרוש דפדפן
    e.preventDefault();
    const body = {
      title: titleRef.current.value,
      info: infoRef.current.value
    }
    try {
      const resp = await axios(
        {
          method: "POST",
          url: API_URL + "/posts/auth",
          data: body,
          // שולח את הטוקן דרך האידר בבקשה שנמצא בלוקאל
          // חובה לעשות לוג אין לפני
          headers:{
            "x-api-key":localStorage.getItem("token")
          }
        }
      )
      if(resp.data._id){
        alert("success !");
        // נשגר את המשתמש לעמוד הפוסטים
        nav("/posts")
      }
      console.log(resp.data)
    }
    catch (err) {
      console.log(err);
      alert(err.response.data.err);
    }
  }

  return (
    <div className='container'>
      <h2>Add post (need token to add):</h2>
      <form onSubmit={onSub} className='col-4'>
        <label>Title:</label>
        <input ref={titleRef} type="text" className='form-control' />
        <label>Info</label>
        <textarea ref={infoRef} className='form-control' rows="4"></textarea>
        <button className='btn btn-success my-3'>Add new</button>
      </form>
    </div>
  )
}
