import React from 'react'
import Dropdown from '@/components/community/Dropdown.jsx'
import Post from '@/components/community/Post.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'
import { useNavigate } from 'react-router-dom'

const CommunityPostList = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header2 label1={'피드'} label2={'내 글 모음'} />
      <div className='px-[10.769vw] pt-[7.11vh] pb-[10vh] bg-white'>
        <div className='flex justify-between my-[2.49vh]'>
          <div className='flex gap-[1.54vw] '>
            <Dropdown label={'감정'} />
            <Dropdown label={'동네'} />
          </div>
          <button
            className='w-[18.72vw] h-[3.08vh] bg-primary-300 border-primary border-[0.5px] rounded-[5px] font-[SemiBold] text-[12px] text-primary'
            onClick={() => navigate('/writepage')}
          >
            새 글 작성
          </button>
        </div>
        <div className='flex flex-col gap-[3.91vh]'>
          <Post
            text={'겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요'}
          />
          <Post
            text={'겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...\n 이젠 못먹는 게 아쉬워요'}
          />
        </div>
      </div>
      <Footer selectedMenu={'community'} />
    </div>
  )
}

export default CommunityPostList
