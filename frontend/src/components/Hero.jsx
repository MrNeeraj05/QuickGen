import React from 'react'
import { ArrowRight, Sparkles, WandSparkles, Image, FileText, Eraser } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

  const navigate = useNavigate()

  return (
<section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-purple-400/20 blur-[120px] animate-pulse" />

        <div className="absolute top-40 -right-40 h-112.5 w-112.5 rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-0 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-pink-300/20 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(80,68,229,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(80,68,229,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
            maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
          }}
        />

      </div>


      {/* Floating particles */}

      <div className="absolute top-32 left-[12%] h-2 w-2 rounded-full bg-purple-500 animate-bounce" />

      <div className="absolute top-52 right-[15%] h-3 w-3 rounded-full bg-blue-500 animate-pulse" />

      <div className="absolute top-[45%] left-[8%] h-2 w-2 rounded-full bg-pink-500 animate-ping" />

      <div className="absolute top-[35%] right-[8%] h-2 w-2 rounded-full bg-indigo-500 animate-bounce" />


      {/* Main content */}

      <div className="mx-auto max-w-7xl px-6 text-center">

        {/* Badge */}

        <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-sm text-gray-600 shadow-sm backdrop-blur-md">

          <Sparkles className="h-4 w-4 text-purple-600" />

          <span>Powerful AI tools, all in one place</span>

          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
            New
          </span>

        </div>


        {/* Heading */}

        <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">

          Create
          <span className="relative mx-3 inline-block">

            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              anything
            </span>

            {/* Glow */}
            <span className="absolute -inset-2 -z-10 rounded-full bg-purple-400/20 blur-2xl" />

          </span>

          with AI

          <br />

          <span className="text-gray-900">
            faster than ever.
          </span>

        </h1>


        {/* Description */}

        <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">

          Write articles, generate stunning images, remove backgrounds,
          analyze resumes and bring your ideas to life — all with
          <span className="font-semibold text-purple-600"> QuickGen.</span>

        </p>


        {/* Buttons */}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button
            onClick={() => navigate('/ai')}
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30"
          >

            Start creating

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

          </button>


          <button
            onClick={() => navigate('/ai')}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-8 py-3.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md"
          >

            <WandSparkles className="h-4 w-4 text-purple-600" />

            Explore AI tools

          </button>

        </div>

        {/* Trust */}

        <div className="mt-10">           
        <div className='flex justify-center items-center gap-4 mt-8 mx-auto text-gray-600'>
            <img src={assets.user_group} alt="user group" className='h-8' />
            <p className='text-sm'>Trusted by 10k+ people</p>
        </div>

          <p className="text-sm text-gray-400 mt-8">
            Built for creators, developers & professionals
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs text-gray-500">
              ✦ AI Writing
            </span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs text-gray-500">
              ✦ Remove Objects
            </span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs text-gray-500">
              ✦ Image Generation
            </span>

            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs text-gray-500">
              ✦ Resume Analysis
            </span>

            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs text-gray-500">
              ✦ Background Removal
            </span>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero