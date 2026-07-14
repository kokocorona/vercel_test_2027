import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import { API_URL } from '../services/apiService';

export default function PostsList() {
  const [listAr, setListAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    // בקשה לשרת נוד ג'יי אס שלנו לקבל
    // את רשימת הפוסטים
    try {
      const url = API_URL+"/posts"
      const resp = await axios.get(url);
      // באקסיוס המידע אוטומטית תמיד נמצא במאפיין דאטא
      console.log(resp.data);
      setListAr(resp.data);

    }
    catch (err) {
      console.log(err)
      alert("There problem , come back later !!!");
    }
  }

  return (
    <div className='container'>
      <h2 className='display-4'>Latest posts:</h2>
      <div className="row">
        {listAr.map(item => {
          return (
            <PostItem key={item._id} item={item} />
          )
        })}

      </div>
    </div>
  )
}
