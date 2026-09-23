import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Image as ImageIcon, FileText } from 'lucide-react'
import Markdown from 'react-markdown' 
function CreationItem({ item }) {
  const [expanded, setExpanded] = useState(false)

  const isImage = item.type === 'image'

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className='group max-w-5xl cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md'
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='flex min-w-0 items-center gap-3'>
          {/* Icon */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isImage
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-purple-50 text-purple-600'
            }`}
          >
            {isImage ? (
              <ImageIcon className='h-5 w-5' />
            ) : (
              <FileText className='h-5 w-5' />
            )}
          </div>

          <div className='min-w-0'>
            <h2 className='truncate font-medium text-slate-700'>
              {item.prompt}
            </h2>

            <p className='mt-1 text-xs text-gray-400'>
              {item.type} •{' '}
              {new Date(item.createdAt || item.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-3'>
          <span
            className={`hidden rounded-full border px-3 py-1 text-xs font-medium sm:block ${
              isImage
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
                : 'border-purple-100 bg-purple-50 text-purple-600'
            }`}
          >
            {item.type}
          </span>

          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition group-hover:bg-purple-50 group-hover:text-purple-600'>
            {expanded ? (
              <ChevronUp className='h-4 w-4' />
            ) : (
              <ChevronDown className='h-4 w-4' />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div
          onClick={(e) => e.stopPropagation()}
          className='mt-4 border-t border-gray-100 pt-4'
        >
          {isImage ? (
            <img
              src={item.content}
              alt={item.prompt}
              className='w-full max-w-md rounded-xl border border-gray-100 object-cover shadow-sm'
            />
          ) : (
            <div className='max-h-72 overflow-y-auto rounded-xl bg-gray-50 p-4 text-sm leading-6 text-slate-600'>
              <div className='reset-tw'>
              <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem