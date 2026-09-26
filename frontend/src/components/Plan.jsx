import React from 'react'
import { PricingTable } from '@clerk/react'
import { Sparkles, Check } from 'lucide-react'

function Plan() {

  return (
    <section id='pricing' className='relative overflow-hidden px-4 py-24 sm:px-20 lg:px-32'>

      {/* Background glow */}
      <div className='absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-purple-400/10 blur-[130px]' />

      <div className='absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-[130px]' />


      {/* Header */}
      <div className='mx-auto max-w-2xl text-center'>

        {/* Badge */}
        <div className='mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600'>

          <Sparkles className='h-4 w-4' />

          Simple & Flexible Pricing

        </div>


        <h2 className='text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl'>

          Choose the plan that

          <br />

          <span className='bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
            works for you
          </span>

        </h2>


        <p className='mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:text-base'>
          Start creating with QuickGen for free and upgrade whenever
          you need more power.
        </p>

      </div>


      {/* Pricing */}
      <div className='relative mx-auto mt-14 max-w-6xl'>

        {/* Glow behind pricing */}
        <div className='absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]' />

        <div className='rounded-4xl border border-gray-100 bg-white/70 p-2 shadow-xl shadow-purple-500/5 backdrop-blur-xl sm:p-4'>

          <PricingTable />

        </div>

      </div>


      {/* Bottom reassurance */}
      <div className='mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500'>

        <div className='flex items-center gap-2'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-green-100'>
            <Check className='h-3 w-3 text-green-600' />
          </span>
          Start for free
        </div>

        <div className='flex items-center gap-2'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-green-100'>
            <Check className='h-3 w-3 text-green-600' />
          </span>
          Upgrade anytime
        </div>

        <div className='flex items-center gap-2'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-green-100'>
            <Check className='h-3 w-3 text-green-600' />
          </span>
          Secure payments
        </div>

      </div>

    </section>
  )
}

export default Plan