import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='container-fluid bg-info'>
      <div className="container">
        <div className="row align-items-center">
          <div className='col-auto'>
            <h2>Logo</h2>
          </div>
          <nav className='col-auto'>
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/addPost">Add post</Link>
            <Link to="/login">Log in</Link>
            <Link to="/addPostAuth">Add post Auth</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
