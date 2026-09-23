import React, { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/react'
import { Heart, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

function Community() {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const { user } = useUser()
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get(
        '/api/user/get-published-creations',
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        setCreations(data.creations || [])
      } else {
        toast.error(data.message || 'Failed to load community creations')
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

  const imageLikeHandler = async (id) => {
    if (!user?.id) return

    // Optimistic UI update: Toggle like status immediately in local state
    setCreations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentLikes = item.likes || []
          const userIdStr = user.id.toString()
          const isLiked = currentLikes.includes(userIdStr)
          const updatedLikes = isLiked
            ? currentLikes.filter((uid) => uid !== userIdStr)
            : [...currentLikes, userIdStr]

          return { ...item, likes: updatedLikes }
        }
        return item
      })
    )

    try {
      const { data } = await axios.post(
        '/api/user/toggle-like-creations',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
        fetchCreations()
      }
    } catch (error) {
      toast.error(error.message)
      fetchCreations()
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
    <div className='min-h-full overflow-y-auto bg-[#fafaff] p-5 text-slate-700 sm:p-7'>

      {/* Page Header */}
      <div className='mb-7'>
        <div className='mb-2 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600'>
          <Users className='h-3.5 w-3.5' />
          QuickGen Community
        </div>

        <h1 className='text-2xl font-bold text-slate-800 sm:text-3xl'>
          Community Creations
        </h1>

        <p className='mt-1 text-sm text-gray-500'>
          Explore AI creations shared by the QuickGen community.
        </p>
      </div>

      {/* Creations */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4'>

        {loading ? (
          <div className='flex min-h-80 items-center justify-center'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600' />
          </div>
        ) : creations.length === 0 ? (
          <div className='flex min-h-80 flex-col items-center justify-center text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-300'>
              <Users className='h-7 w-7' />
            </div>

            <h2 className='mt-4 text-sm font-semibold text-slate-700'>
              No community creations yet
            </h2>

            <p className='mt-1 max-w-sm text-xs leading-5 text-gray-400'>
              Public AI creations from the QuickGen community will appear here.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

            {creations.map((creation, index) => {
              const isLiked = creation.likes?.includes(user?.id)

              return (
                <div
                  key={creation.id || index}
                  className='group relative overflow-hidden rounded-xl bg-gray-100'
                >

                  {/* Image */}
                  <img
                    src={creation.content}
                    alt={creation.prompt || 'AI creation'}
                    loading='lazy'
                    className='aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105'
                  />

                  {/* Overlay */}
                  <div className='absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>

                    <p className='line-clamp-2 text-sm font-medium text-white'>
                      {creation.prompt}
                    </p>

                    <div className='mt-3 flex items-center justify-between'>
                      <span className='text-xs text-white/70'>
                        AI Creation
                      </span>

                      <div className='flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-md'>
                        <span className='text-xs text-white'>
                          {creation.likes?.length || 0}
                        </span>

                        <Heart
                          onClick={() => imageLikeHandler(creation.id)}
                          className={`h-4 w-4 cursor-pointer transition-transform duration-200 hover:scale-110 ${
                            isLiked
                              ? 'fill-red-500 text-red-500'
                              : 'text-white'
                          }`}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}

          </div>
        )}

      </div>
    </div>
  ) :(
    <div className='flex h-full items-center justify-center'>
      <span className='h-10 w-10  animate-spin rounded-full border-3 border-purple-200 border-t-purple-600' />
    </div>
  )
}

export default Community