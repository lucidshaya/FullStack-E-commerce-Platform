import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from '../Common/Navbar'

const Header = () => {
  return (
    <div>
      <header className='border-b border-gray-200'>
        {/* Top-bar */}
        <Topbar />
        {/* navbar */}
        <Navbar />
        {/* Cart Drawer */}
    </header>
    </div>
  )
}

export default Header