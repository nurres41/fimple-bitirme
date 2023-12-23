import React from 'react'
import { Link } from 'react-router-dom'
//Components
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className='absolute flex flex-col gap-4 bg-gray-400 justify-start items-start pt-5 w-[240px] ps-5 min-h-screen'>
        <Logo />
        <Link to='/admin'>Giris Yap</Link>
        <Link to='/basvuru-olustur'>Basvuru Olustur</Link>
        <Link to='/basvuru-sorgula'>Basvuru Sorgula</Link>
    </nav>
  )
}

export default Navbar
