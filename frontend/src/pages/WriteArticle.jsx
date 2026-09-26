import React, { useState } from 'react'
import { Edit, Sparkles , WandSparkles} from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArticle() {
  const articleLength = [
    { length: '800', label: 'Short', desc: '500-800 words' },
    { length: '1200', label: 'Medium', desc: '800-1200 words' },
    { length: '1600', label: 'Long', desc: '1200+ words' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);
      const prompt = `Write a comprehensive and detailed article about "${input}". Target length: ${selectedLength.desc}. Organize into clear headings (## Heading) and paragraphs using standard Markdown. Write out the entire article completely.`
      const { data } = await axios.post(
        '/api/ai/generate-article',
        {
          prompt,
          length: Number(selectedLength.length)
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )

      if (data.success) {
        setContent(data.content)
        toast.success(data.message || 'Article generated successfully')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error.message !== 'canceled' && error.message !== 'terminated') {
        toast.error(error.response?.data?.message || error.message || 'Something went wrong')
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-full overflow-y-auto bg-[#fafaff] p-5 text-slate-700 sm:p-7'>
      <div className='mb-7'>
        <div className='mb-2 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600'>
          <WandSparkles className='h-3.5 w-3.5' />
          AI Writing Tool
        </div>

        <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
          AI Article Writer
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Generate high-quality articles in seconds with QuickGen AI.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'
        >
          {/* Heading */}
          <div className='mb-7 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'>
              <Sparkles className='h-5 w-5' />
            </div>

            <div>
              <h1 className='text-lg font-semibold text-slate-800'>
                Article Configuration
              </h1>

              <p className='mt-0.5 text-xs text-gray-400'>
                Configure your article before generating
              </p>
            </div>
          </div>

          {/* Article Topic */}
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Article Topic
            </p>

            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100'
              placeholder='The future of artificial intelligence is...'
              required
            />
          </div>

          {/* Article Length */}
          <div className='mt-4'>
            <p className='text-sm font-medium text-slate-700'>
              Article Length
            </p>

            <div className='mt-3 flex flex-wrap gap-3'>
              {articleLength.map((item, index) => (
                <button
                  type='button'
                  onClick={() => setSelectedLength(item)}
                  className={`rounded-xl border px-4 py-2.5 text-left transition-all duration-200 ${
                    selectedLength.length === item.length
                      ? 'border-purple-200 bg-purple-50 text-purple-600 shadow-sm shadow-purple-500/10'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-purple-100 hover:bg-purple-50/50'
                  }`}
                  key={index}
                >
                  <p className='text-xs font-semibold'>
                    {item.label}
                  </p>

                  <p className='mt-0.5 text-[10px] text-gray-400'>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button disabled={loading}
            type='submit'
            className='mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25'
          >
            {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin '></span> :
            <Edit className='h-4 w-4' />
            }
            Generate Article
          </button>
        </form>

        {/* Right Column */}
        <div className='flex min-h-100 w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>          {/* Header */}
          <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600'>
              <Edit className='h-4 w-4' />
            </div>

            <div>
              <h1 className='text-sm font-semibold text-slate-800'>
                Generated Article
              </h1>

              <p className='text-xs text-gray-400'>
                Your generated content will appear here
              </p>
            </div>
          </div>

          {/* Empty State */}
          {!content ? (
            <div className='flex flex-1 items-center justify-center'>
            <div className='flex max-w-sm flex-col items-center gap-4 text-center text-gray-400'>
              <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-300'>
                <Edit className='h-7 w-7' />
              </div>

              <p className='text-sm leading-6'>
                Enter a topic and click{' '}
                <span className='font-medium text-purple-500'>
                  "Generate Article"
                </span>{' '}
                to get started
              </p>
            </div>
          </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600 leading-relaxed'>
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

export default WriteArticle