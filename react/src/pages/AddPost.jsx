import axios from 'axios';
import React, { useRef } from 'react'
import { API_URL } from '../services/apiService';

export default function AddPost() {
  // משתנים שידברו עם האלמנטים של האינפוט
  // כדי לאסוף את המידע של המשתמש
  const titleRef = useRef();
  const infoRef = useRef();

  const onSub = async(e) => {
    // מונע שיגור של טופס ורפרוש דפדפן
    e.preventDefault();
    const body = {
      title: titleRef.current.value,
      info:infoRef.current.value
    }
    const resp = await axios(
      {
        method:"POST",
        url:API_URL+"/posts",
        data:body
      }
    )
    console.log(resp.data)
  }

  return (
    <div className='container'>
      <h2>Add post:</h2>
      <form onSubmit={onSub} className='col-4'>
        <label>Title:</label>
        <input ref={titleRef} type="text" className='form-control' />
        <label>Info</label>
        <textarea ref={infoRef} className='form-control' rows="4"></textarea>
        <button className='btn btn-info my-3'>Add new</button>
      </form>
    </div>
  )
}
