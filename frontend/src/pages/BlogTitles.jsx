import React, { useState } from 'react'
import { Hash, WandSparkles } from 'lucide-react'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function BlogTitles() {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ]

  const [selectedCategory, setCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input.trim()) {
      toast.error('Please enter a keyword')
      return
    }

    try {
      setLoading(true)

      const prompt = `Generate catchy and engaging blog titles for the keyword "${input}" in the category "${selectedCategory}". Provide multiple title suggestions.`

      const { data } = await axios.post(
        '/api/ai/generate-blog-titles',
        {
          prompt,
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
          AI Writing Tool
        </div>

        <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
          AI Blog Title Generator
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Generate catchy and engaging blog titles with QuickGen AI.
        </p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className='flex min-h-100 w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'
        >

          {/* Heading */}
          <div className='mb-7 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'>
              <Hash className='h-5 w-5' />
            </div>

            <div>
              <h2 className='text-lg font-semibold text-slate-800'>
                Title Configuration
              </h2>

              <p className='mt-0.5 text-xs text-gray-400'>
                Choose a topic and category for your titles
              </p>
            </div>
          </div>

          {/* Keyword */}
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Keyword
            </p>

            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='e.g. Artificial Intelligence'
              required
              className='mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100'
            />
          </div>

          {/* Category */}
          <div className='mt-4'>
            <p className='text-sm font-medium text-slate-700'>
              Category
            </p>

            <div className='mt-3 flex flex-wrap gap-3'>
              {blogCategories.map((item) => (
                <button
                  key={item}
                  type='button'
                  onClick={() => setCategory(item)}
                  className={`rounded-xl border px-4 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                    selectedCategory === item
                      ? 'border-purple-200 bg-purple-50 text-purple-600 shadow-sm shadow-purple-500/10'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-purple-100 hover:bg-purple-50/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type='submit'
            disabled={loading}
            className='mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {loading ? (
              <span className='my-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
            ) : (
              <Hash className='h-4 w-4' />
            )}

            {loading ? 'Generating...' : 'Generate Titles'}
          </button>
        </form>

        {/* Right Column */}
        <div className='flex min-h-100 w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>

          {/* Header */}
          <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600'>
              <Hash className='h-4 w-4' />
            </div>

            <div>
              <h2 className='text-sm font-semibold text-slate-800'>
                Generated Titles
              </h2>

              <p className='text-xs text-gray-400'>
                Your generated titles will appear here
              </p>
            </div>
          </div>

          {/* Content */}
          {!content ? (
            <div className='flex flex-1 items-center justify-center'>
              <div className='flex max-w-sm flex-col items-center gap-4 text-center text-gray-400'>

                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-300'>
                  <Hash className='h-7 w-7' />
                </div>

                <p className='text-sm leading-6'>
                  Enter a keyword and click{' '}
                  <span className='font-medium text-purple-500'>
                    "Generate Titles"
                  </span>{' '}
                  to get started
                </p>

              </div>
            </div>
          ) : (
            <div className='mt-4 min-h-0 flex-1 overflow-y-auto text-sm leading-7 text-slate-600'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default BlogTitles