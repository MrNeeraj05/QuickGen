import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { SignInButton, UserButton, useUser } from '@clerk/react'
import { ArrowRight, LayoutDashboard } from 'lucide-react'

function Navbar() {

  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  return (
    <nav className='fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white/40 px-4 py-3 backdrop-blur-2xl sm:px-20 xl:px-32'>

      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className='flex cursor-pointer items-center gap-2'
      >

        <img
          src={assets.favicon}
          alt='QuickGen'
          className='h-9 w-9 object-contain'
        />

        <span className='bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
          QuickGen
        </span>

      </div>


      {/* Auth */}
      {isSignedIn ? (
  <div className='flex items-center gap-3'>
    
    <button
      onClick={() => navigate('/ai')}
      className='hidden sm:flex items-center gap-2 rounded-full border border-purple-100 bg-white px-5 py-2 text-sm font-medium text-purple-600 shadow-sm transition hover:border-purple-200 hover:bg-purple-50'
    >
      <LayoutDashboard className='h-4 w-4' />
      Dashboard
    </button>

    <UserButton />
    
  </div>
) : (
  <SignInButton mode='modal' forceRedirectUrl='/ai'>
    <button className='flex items-center gap-2 rounded-full bg-primary px-7 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 sm:px-10'>
      Get Started
      <ArrowRight className='h-4 w-4' />
    </button>
  </SignInButton>
)}

    </nav>
  )
}

export default Navbar