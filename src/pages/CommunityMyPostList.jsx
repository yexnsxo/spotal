import Dropdown from '@/components/community/Dropdown.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import PostList from '@/components/community/PostList.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from './Signup'
import Loading from '@/components/shared/Loading'

const CommunityMyPostList = () => {
  const [myPostData, setMyPostData] = useState([])
  const userId = localStorage.getItem('user.id')
  const [emotionId, setEmotionId] = useState(null)
  const [locationId, setLocationId] = useState(null)
  const [boardId, setBoardId] = useState(null)
  const [loading, isLoading] = useState(false)

  const getMyPost = () => {
    isLoading(true)
    axios
      .get(`${baseURL}/community/my/`, {
        params: {
          user_id: userId,
          emotion_ids: emotionId ?? null,
          location_id: locationId ?? null,
          board_id: boardId ?? null,
        },
      })
      .then((res) => {
        isLoading(false)
        const posts = Array.isArray(res.data?.data) ? res.data.data : []
        setMyPostData(posts)
      })
      .catch(() => {
        isLoading(false)
        setMyPostData([])
      })
  }

  useEffect(() => {
    getMyPost()
  }, [locationId, emotionId, boardId])

  if (loading) return <Loading />

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='max-w-[768px] w-full flex flex-col items-center justify-center bg-white'>
        <Header2 label1={'내 글'} label2={'새 글 작성'} link={'/writepage'} />
        <div className='pt-[7.11vh] pb-[10vh] bg-white min-h-screen'>
          <div className='flex justify-between my-[2.49vh]'>
            <div className='flex gap-[1.54vw] '>
              <Dropdown value={emotionId} onSelect={(id) => setEmotionId(id)} label={'감정'} />
              <Dropdown value={locationId} onSelect={(id) => setLocationId(id)} label={'동네'} />
              <Dropdown value={boardId} onSelect={(id) => setBoardId(id)} label={'분류'} />
            </div>
          </div>
          <PostList postData={myPostData} />
        </div>
        <Footer selectedMenu={'community'} />
      </div>
    </div>
  )
}

export default CommunityMyPostList
