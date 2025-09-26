import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { baseURL } from './Signup'
import PostDetail from '@/components/community/PostDetail'
import { useParams } from 'react-router-dom'
import Loading from '@/components/shared/Loading'

const CommunityPost = () => {
  const [loading, setLoading] = useState(false)
  const { memory_id } = useParams()

  if (loading) return <Loading />
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <div className='max-w-[768px] w-full flex flex-col items-center justify-center bg-white'>
          <Header2 label1={'피드'} label2={'내 글 모음'} link={'/mypost'} />
          <div className='pb-[10vh] bg-white min-h-screen pt-[10vh]'>
            <PostDetail memoryId={memory_id} />
          </div>
          <Footer selectedMenu={'community'} />
        </div>
      </div>
    </div>
  )
}

export default CommunityPost
