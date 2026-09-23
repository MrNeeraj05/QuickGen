import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Lazy loaded page components for optimal initial bundle performance
const Home = lazy(() => import('./pages/Home'))
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const BlogTitles = lazy(() => import('./pages/BlogTitles'))
const GenerateImage = lazy(() => import('./pages/GenerateImage'))
const Community = lazy(() => import('./pages/Community'))
const RemoveObject = lazy(() => import('./pages/RemoveObject'))
const RemoveBackground = lazy(() => import('./pages/RemoveBackground'))
const WriteArticle = lazy(() => import('./pages/WriteArticle'))
const ReviewResume = lazy(() => import('./pages/ReviewResume'))

const PageLoader = () => (
  <div className='flex h-screen w-full items-center justify-center bg-[#fafaff]'>
    <div className='h-10 w-10 animate-spin rounded-full border-3 border-purple-200 border-t-purple-600' />
  </div>
)

function App() {
  return (
    <div>
      <Toaster />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Landing Page */}
          <Route path='/' element={<Home />} />

          {/* AI Dashboard */}
          <Route path='/ai' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='blog-titles' element={<BlogTitles />} />
            <Route path='generate-image' element={<GenerateImage />} />
            <Route path='community' element={<Community />} />
            <Route path='remove-object' element={<RemoveObject />} />
            <Route path='remove-background' element={<RemoveBackground />} />
            <Route path='write-article' element={<WriteArticle />} />
            <Route path='review-resume' element={<ReviewResume />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App