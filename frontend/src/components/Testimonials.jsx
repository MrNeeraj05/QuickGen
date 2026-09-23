import React from 'react'
import { dummyTestimonialData } from '../assets/assets'
import { Quote, Sparkles, BadgeCheck } from 'lucide-react'

function Testimonials() {

  return (
    <section className='relative overflow-hidden px-4 py-24 sm:px-20 lg:px-32'>

      {/* Background glow */}
      <div className='absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-purple-400/10 blur-[130px]' />

      <div className='absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-[130px]' />


      {/* Header */}
      <div className='mx-auto max-w-2xl text-center'>

        <div className='mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600'>

          <Sparkles className='h-4 w-4' />

          Loved by creators

        </div>


        <h2 className='text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl'>

          What creators say about

          <br />

          <span className='bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
            QuickGen
          </span>

        </h2>


        <p className='mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:text-base'>
          Don't just take our word for it. See how creators and professionals
          are using QuickGen to create better content, faster.
        </p>

      </div>


      {/* Testimonials */}
      <div className='mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3'>

        {dummyTestimonialData.map((testimonial, index) => (

          <div
            key={index}
            className='group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-500/10'
          >

            {/* Card glow */}
            <div className='absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-400/10 blur-3xl transition-all duration-500 group-hover:bg-purple-400/20' />


            {/* Quote icon */}
            <div className='absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-purple-50 text-purple-500'>
              <Quote className='h-5 w-5' />
            </div>


            {/* Rating */}
            <div className='relative z-10 flex gap-1'>

              {[...Array(5)].map((_, starIndex) => (

                <svg
                  key={starIndex}
                  className={`h-4 w-4 ${ 
                    starIndex < testimonial.rating
                      ? 'text-purple-500'
                      : 'text-gray-200'
                  }`}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M10 1.5l2.63 5.33 5.88.85-4.25 4.14 1 5.86L10 14.91l-5.26 2.77 1-5.86L1.49 7.68l5.88-.85L10 1.5z' />
                </svg>

              ))}

            </div>


            {/* Testimonial */}
            <p className='relative z-10 mt-6 min-h-30 text-sm leading-7 text-gray-500'>
              "{testimonial.content}"
            </p>


            {/* Divider */}
            <div className='my-6 h-px bg-linear-to-r from-gray-100 via-purple-100 to-gray-100' />


            {/* User */}
            <div className='relative z-10 flex items-center gap-3'>

              <div className='relative'>

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='h-11 w-11 rounded-full object-cover ring-2 ring-purple-100'
                />

                <div className='absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white'>
                  <BadgeCheck className='h-4 w-4 fill-indigo-500 text-white' />
                </div>

              </div>


              <div>

                <p className='font-semibold text-gray-800'>
                  {testimonial.name}
                </p>

                <p className='mt-0.5 text-xs text-gray-400'>
                  {testimonial.title}
                </p>

              </div>

            </div>


            {/* Bottom gradient */}
            <div className='absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full' />

          </div>

        ))}

      </div>


      {/* Bottom trust line */}
      <div className='mt-14 text-center'>

        <div className='inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2.5 text-sm text-gray-500 shadow-sm'>

          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-xs text-white'>
            ✦
          </span>

          Built for creators who want to create more, faster.

        </div>

      </div>

    </section>
  )
}

export default Testimonials