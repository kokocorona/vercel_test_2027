import React from 'react'

export default function PostItem({item}) {
  return (
    <div key={item._id} className='border p-2 col-6 my-2'>
      <h4>{item.title} --</h4>
      <p>{item.info}</p>
    </div>
  )
}
