import React, { useState } from 'react'
import { Scissors, WandSparkles } from 'lucide-react'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function RemoveObject() {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
  
    const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      if(object.split(' ').length>1){
        return toast('Please enter only one object name')
      }

      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)

      const { data } = await axios.post(
        '/api/ai/remove-image-object',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        setContent(data.content)
        toast.success('Background removed successfully')
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
          AI Image Tool
        </div>

        <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
          Object Removal
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Remove unwanted objects from your images with QuickGen AI.
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
              <Scissors className='h-5 w-5' />
            </div>

            <div>
              <h2 className='text-lg font-semibold text-slate-800'>
                Object Removal
              </h2>

              <p className='mt-0.5 text-xs text-gray-400'>
                Upload an image and describe what you want to remove
              </p>
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <p className='text-sm font-medium text-slate-700'>
              Upload Image
            </p>

            <input
              onChange={(e) => setInput(e.target.files[0])}
              accept='image/*'
              type='file'
              className='mt-2 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-600 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-purple-600 hover:border-purple-200 focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100'
              required
            />
          </div>

          <p className='mt-2 text-xs font-light text-slate-400'>
            Supports JPG, PNG and other image formats
          </p>

          {/* Object Description */}
          <div className='mt-4'>
            <p className='text-sm font-medium text-slate-700'>
              Describe Object to Remove
            </p>

            <textarea
              onChange={(e) => setObject(e.target.value)}
              value={object}
              rows={5}
              className='mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100'
              placeholder='e.g. car in background, tree from the image'
              required
            />

            <p className='mt-2 text-xs font-light text-slate-400'>
              Be specific about what you want to remove
            </p>
          </div>

          {/* Generate Button */}
          <button disabled ={loading}
            type='submit'
            className='mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25'
          >
            {loading ? (
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
            ) : (
              <Scissors className='h-4 w-4' />
            )}
            {loading ? 'Removing...' : 'Remove Object'}
          </button>
        </form>

        {/* Right Column */}
        <div className='flex min-h-100 w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>

          {/* Header */}
          <div className='flex items-center gap-3 border-b border-gray-100 pb-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600'>
              <Scissors className='h-4 w-4' />
            </div>

            <div>
              <h2 className='text-sm font-semibold text-slate-800'>
                Processed Image
              </h2>

              <p className='text-xs text-gray-400'>
                Your image with the selected object removed will appear here
              </p>
            </div>
          </div>

          {/* Empty State */}
          {!content?(
          <div className='flex flex-1 items-center justify-center'>
                      <div className='flex max-w-sm flex-col items-center gap-4 text-center text-gray-400'>

                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-300'>
                          <Scissors className='h-7 w-7' />
                        </div>

                        <p className='text-sm leading-6'>
                          Upload an image and describe what to remove, then click{' '}
                          <span className='font-medium text-purple-500'>
                            "Remove Object"
                          </span>{' '}
                          to get started
                        </p>

                      </div>
                    </div>
          ):(
            <img className='mt-2 h-full w-full' src={content} alt="image" />
          )}
          
        </div>

      </div>
    </div>
  )
}

export default RemoveObject