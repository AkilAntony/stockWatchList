import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <h2 className="title">
        TradeBrains
      </h2>
      <div className="navLinks">
        <Link to = '/' className='link'>Home</Link>
        <Link to = 'watchlist' className='link'>watchlist</Link>
      </div>
    </nav>
  )
}

export default Header