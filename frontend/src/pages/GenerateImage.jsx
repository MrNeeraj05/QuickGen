import React, { useState } from 'react'
import { Image, WandSparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'
import { useAuth } from '@clerk/react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function GenerateImage() {
  const imageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy Style',
    'Realistic style',
    '3D style',
    'Portrait style',
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in ${selectedStyle} style`
      const { data } = await axios.post(
        '/api/ai/generate-image',
        {
          prompt,publish
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        setContent(data.content)
        toast.success('Titles generated successfully')
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='min-h-full overflow-y-auto bg-[#fafaff] p-5 text-slate-700 sm:p-7'>

      {/* Page Header */}
      <div className='mb-7'>
        <div className='mb-2 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600'>
          <WandSparkles className='h-3.5 w-3.5' />
          AI Image Generator
        </div>

        <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
          AI Image Generator
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Create stunning visuals from your ideas with QuickGen AI.
        </p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'
        >

          {/* Heading */}
          <div className='mb-7 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'>
              <Image className='h-5 w-5' />
            </div>

            <div>
              <h2 className='text-lg font-semibold text-slate-800'>
                Image Configuration
              </h2>

              <p className='mt-0.5 text-xs text-gray-400'>
                Describe your image and choose a visual style
              </p>
            </div>
          </div>

          {/* Image Description */}
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Describe Your Image
            </p>

            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={4}
              className='mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100'
              placeholder='Describe what you want to see in the image...'
              required
            />
          </div>

          {/* Style */}
          <div className='mt-5'>
            <p className='text-sm font-medium text-slate-700'>
              Style
            </p>

            <div className='mt-3 flex flex-wrap gap-3'>
              {imageStyle.map((item) => (
                <button
                  type='button'
                  onClick={() => setSelectedStyle(item)}
                  className={`rounded-xl border px-4 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                    selectedStyle === item
                      ? 'border-purple-200 bg-purple-50 text-purple-600 shadow-sm shadow-purple-500/10'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-purple-100 hover:bg-purple-50/50'
                  }`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Public Toggle */}
          <div className='mt-6 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3'>
            <div>
              <p className='text-sm font-medium text-slate-700'>
                Make this image public
              </p>

              <p className='mt-0.5 text-xs text-gray-400'>
                Allow others to discover your creation
              </p>
            </div>

            <label className='relative inline-flex cursor-pointer items-center'>
              <input
                type='checkbox'
                checked={publish}
                onChange={(e) => setPublish(e.target.checked)}
                className='peer sr-only'
              />

              <div className='h-6 w-11 rounded-full bg-slate-300 transition-colors duration-200 peer-checked:bg-purple-600' />

              <span className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5' />
            </label>
          </div>

          {/* Generate Button */}
          <button disabled={loading}
            type='submit'
            className='mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25'
          >
            {loading ? (
              <span className='my-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
            ) : (
              <Image className='h-4 w-4' />
            )}
            Generate Image
          </button>
        </form>

        {/* Right Column */}
        <div className='flex min-h-100 w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>

          {/* Header */}
          <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600'>
              <Image className='h-4 w-4' />
            </div>

            <div>
              <h2 className='text-sm font-semibold text-slate-800'>
                Generated Image
              </h2>

              <p className='text-xs text-gray-400'>
                Your generated image will appear here
              </p>
            </div>
          </div>

          {/* Empty State */}
          {!content ?(
            <div className='flex flex-1 items-center justify-center'>
                        <div className='flex max-w-sm flex-col items-center gap-4 text-center text-gray-400'>

                          <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-300'>
                            <Image className='h-7 w-7' />
                          </div>

                          <p className='text-sm leading-6'>
                            Describe your image and click{' '}
                            <span className='font-medium text-purple-500'>
                              "Generate Image"
                            </span>{' '}
                            to get started
                          </p>

                        </div>
                      </div>
          ):(
            <div className='mt-3 h-full'>
              <img src={content} alt="Generated Image" className='w-full h-full'/>
            </div>
          )}
          
        </div>

      </div>
    </div>
  )
}

export default GenerateImage