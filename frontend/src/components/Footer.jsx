import React from 'react'
import { assets } from '../assets/assets'
import {
  ArrowUpRight,
  Mail,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Footer() {

  const navigate = useNavigate()

  return (
    <footer className='relative mt-20 overflow-hidden border-t border-gray-100 bg-white'>

      {/* Background glow */}
      <div className='absolute -left-40 top-10 z-0 h-80 w-80 rounded-full bg-purple-400/10 blur-[120px]' />

      <div className='absolute -right-40 bottom-0 z-0 h-80 w-80 rounded-full bg-indigo-400/10 blur-[120px]' />


      <div className='relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-10 lg:px-16 xl:px-20'>

        {/* Main footer */}
        <div className='grid gap-12 border-b border-gray-100 pb-12 md:grid-cols-2 lg:grid-cols-4'>


          {/* Brand */}
          <div className='lg:col-span-2'>

            <div
              className='flex w-fit cursor-pointer items-center gap-2'
              onClick={() => navigate('/')}
            >

              <img
                src={assets.favicon}
                alt='QuickGen'
                className='h-9 w-9 object-contain'
              />

              <span className='text-2xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
                QuickGen
              </span>

            </div>


            <p className='mt-5 max-w-md text-sm leading-7 text-gray-500'>
              Create smarter, faster and better with powerful AI tools.
              Write articles, generate images, remove backgrounds,
              analyze resumes and more — all in one place.
            </p>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className='mb-5 text-sm font-semibold text-gray-800'>
              Quick Links
            </h3>

            <ul className='space-y-3 text-sm text-gray-500'>

              <li>
                <button
                  onClick={() => navigate('/')}
                  className='transition-colors hover:text-purple-600'
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/ai')}
                  className='transition-colors hover:text-purple-600'
                >
                  AI Tools
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/ai/community')}
                  className='transition-colors hover:text-purple-600'
                >
                  Community
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/')}
                  className='transition-colors hover:text-purple-600'
                >
                  Pricing
                </button>
              </li>

            </ul>

          </div>


          {/* Newsletter */}
          <div>

            <h3 className='mb-5 text-sm font-semibold text-gray-800'>
              Stay updated
            </h3>

            <p className='text-sm leading-6 text-gray-500'>
              Get the latest AI tools, updates and product news.
            </p>


            <div className='mt-5 flex items-center rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-500/10'>

              <Mail className='ml-2 h-4 w-4 shrink-0 text-gray-400' />

              <input
                type='email'
                placeholder='Your email'
                className='min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400'
              />

              <button
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white transition-transform hover:scale-105'
              >
                <ArrowUpRight className='h-4 w-4' />
              </button>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className='flex flex-col items-center justify-between gap-4 pt-6 text-xs text-gray-400 sm:flex-row'>

          <p>
            © {new Date().getFullYear()} QuickGen. All rights reserved.
          </p>

          <div className='flex items-center gap-5'>

            <button className='transition-colors hover:text-purple-600'>
              Privacy Policy
            </button>

            <button className='transition-colors hover:text-purple-600'>
              Terms of Service
            </button>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer