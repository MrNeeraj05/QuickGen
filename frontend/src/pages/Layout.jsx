import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUser, SignIn } from '@clerk/react'
import Sidebar from '../components/Sidebar'
import { assets } from '../assets/assets'

function Layout() {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <SignIn />
      </div>
    )
  }

  return (
    <div className='flex h-screen flex-col overflow-hidden bg-[#fafaff]'>

      {/* Dashboard Navbar */}
      <nav className='z-50 flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-white/90 px-5 backdrop-blur-xl sm:px-7'>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className='flex cursor-pointer items-center gap-2'
        >

          <img
            src={assets.favicon}
            alt='QuickGen'
            className='h-8 w-8 object-contain'
          />

          <span className='text-xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
            QuickGen
          </span>

        </div>


        {/* Mobile menu */}
        <button
          onClick={() => setSidebar(!sidebar)}
          className='rounded-lg p-2 text-gray-500 transition hover:bg-purple-50 hover:text-purple-600 sm:hidden'
        >
          {sidebar ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </button>

      </nav>


      {/* Main */}
      <div className='flex min-h-0 flex-1'>

        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />


        {/* Mobile overlay */}
        {sidebar && (
          <div
            onClick={() => setSidebar(false)}
            className='fixed inset-0 top-14 z-30 bg-black/20 backdrop-blur-[2px] sm:hidden'
          />
        )}


        {/* Content */}
        <main className='min-w-0 flex-1 overflow-y-auto'>

          <Outlet />

        </main>

      </div>

    </div>
  )
}

export default Layout