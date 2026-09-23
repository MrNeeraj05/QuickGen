import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

function AiTools() {

  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section className='relative overflow-hidden px-4 py-24 sm:px-20 lg:px-32'>

      {/* Background glow */}
      <div className='absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-purple-400/10 blur-[120px]' />

      <div className='absolute -right-40 bottom-10 -z-10 h-80 w-80 rounded-full bg-indigo-400/10 blur-[120px]' />


      {/* Heading */}
      <div className='mx-auto max-w-2xl text-center'>

        <div className='mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600'>

          <Sparkles className='h-4 w-4' />
          AI Powered Tools

        </div>


        <h2 className='text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl'>

          Powerful AI Tools

          <br />

          <span className='bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
            built for you
          </span>

        </h2>


        <p className='mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:text-base'>
          Everything you need to create, enhance and optimize your
          content with powerful AI tools.
        </p>

      </div>


      {/* Tools */}
      <div className='mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>

        {AiToolsData.map((tool, index) => {

          const Icon = tool.Icon

          return (
            <div
              key={index}
              onClick={() => user && navigate(tool.path)}
              className={`group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 ${
                user
                  ? 'cursor-pointer hover:-translate-y-2 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-500/10'
                  : 'cursor-default'
              }`}
            >

              {/* Hover glow */}
              <div
                className='absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-30'
                style={{
                  background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
                }}
              />


              {/* Icon + arrow */}
              <div className='relative z-10 flex items-center justify-between'>

                <div
                  className='flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'
                  style={{
                    background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                    boxShadow: `0 10px 25px ${tool.bg.from}25`
                  }}
                >
                  <Icon className='h-6 w-6 text-white' />
                </div>


                <div className='flex h-9 w-9 translate-x-2 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>

                  <ArrowUpRight className='h-4 w-4' />

                </div>

              </div>


              {/* Content */}
              <div className='relative z-10 mt-6'>

                <h3 className='text-lg font-semibold text-slate-800 transition-colors duration-300 group-hover:text-purple-600'>
                  {tool.title}
                </h3>

                <p className='mt-3 text-sm leading-6 text-gray-500'>
                  {tool.description}
                </p>

              </div>


              {/* Bottom gradient line */}
              <div
                className='absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full'
                style={{
                  background: `linear-gradient(90deg, ${tool.bg.from}, ${tool.bg.to})`
                }}
              />

            </div>
          )
        })}

      </div>


      {/* Bottom CTA */}
      <div className='mt-12 text-center'>

        <button
          onClick={() => user && navigate('/ai')}
          className='group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30'
        >

          Explore all AI tools

          <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />

        </button>

      </div>

    </section>
  )
}

export default AiTools