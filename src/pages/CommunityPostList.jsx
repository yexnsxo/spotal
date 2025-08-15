import React from 'react'
import Dropdown from '@/components/community/Dropdown.jsx'
import Post from '@/components/community/Post.jsx'
import Header2 from '@/components/shared/Header2.jsx'
import Footer from '@/components/shared/Footer.jsx'

const CommunityPostList = () => {
  return (
    <div>
      <Header2 label1={'피드'} label2={'내 글 모음'} />
      <div className='px-[10.769vw] pt-[7.11vh] pb-[10vh] bg-white'>
        <div className='flex gap-[1.54vw] my-[2.49vh]'>
          <Dropdown label={'감정'} />
          <Dropdown label={'동네'} />
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
