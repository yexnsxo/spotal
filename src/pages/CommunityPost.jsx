import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { baseURL } from './Signup'
import PostDetail from '@/components/community/PostDetail'
import { useParams } from 'react-router-dom'
import Loading from '@/components/shared/Loading'

const CommunityPost = () => {
  const [postData, setPostData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [loading, setLoading] = useState(false)
  const { memory_id } = useParams()

  const getPost = () => {
    axios
      .get(`${baseURL}/community/memories/${memory_id}/`)
      .then((res) => {
        setLoading(false)
        const post = res?.data?.data
        setPostData(post)
        console.log(post)
      })
      .catch(() => {
        setLoading(false)
        setPostData([])
      })
  }
  const getPostComment = () => {
    axios
      .get(`${baseURL}/community/comments/?memory_id=${memory_id}`)
      .then((res) => {
        setLoading(false)
        const comments = res?.data
        setCommentData(comments)
        console.log(comments)
      })
      .catch(() => {
        setLoading(false)
        setCommentData([])
      })
  }

  useEffect(() => {
    setLoading(true)
    getPost()
    getPostComment()
  }, [memory_id])

  if (loading) return <Loading />
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <div className='max-w-[768px] w-full flex flex-col items-center justify-center bg-white'>
          <Header2 label1={'피드'} label2={'내 글 모음'} link={'/mypost'} />
          <div className='pb-[10vh] bg-white min-h-screen pt-[10vh]'>
            <PostDetail postData={postData} commentData={commentData} />
          </div>
          <Footer selectedMenu={'community'} />
        </div>
      </div>
    </div>
  )
}

export default CommunityPost
