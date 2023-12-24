import React from 'react'
import { Link } from 'react-router-dom'
//Components
import Logo from './Logo'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const { auth, clearAuth } = useAuth();

  const logout = () => {
    clearAuth();
  }

  return (
    <nav className='absolute none flex-col gap-4 bg-gray-400 justify-start items-start pt-5 w-[240px] ps-5 min-h-screen md:flex'>
        <Logo />
        {
          !auth ? (
            <Link className='border border-green-600 bg-gray-200 px-5 py-2 font-semibold rounded-lg' to='/admin'>Giris Yap</Link>
          ) :
            <button onClick={logout} className='border border-red-600 bg-gray-200 px-5 py-2 font-semibold rounded-lg'>Cikis Yap</button>
        }
        <Link className='border border-blue-600 bg-gray-200 px-5 py-2 font-semibold rounded-lg' to='/basvuru-olustur'>Basvuru Olustur</Link>
        <Link className='border border-blue-600 bg-gray-200 px-5 py-2 font-semibold rounded-lg' to='/basvuru-sorgula'>Basvuru Sorgula</Link>
    </nav>
  )
}

export default Navbar
