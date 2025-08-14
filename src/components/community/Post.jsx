import React from 'react'
import Tag from './Tag.jsx'

const Post = () => {
  return (
    <div className='flex flex-col relative px-[3.846vw] w-[76.67vw] h-[44.312vh] rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] bg-white'>
      <div className='flex gap-[0.5rem] items-center ml-[0.5vw] mt-[1.6vh]'>
        <img className='w-[5.13vw] h-[5.13vw] rounded-full bg-grey-100 border-none' />
        <p className='font-[Medium] text-[0.75rem]'>사용자 1</p>
      </div>
      <img
        className='w-[68.974vw] h-[29.146vh] bg-grey-100 rounded-[10px] mt-[1.6vh]'
        alt='골목 과거 사진'
      />
      <p className='whitespace-pre-line mt-[1.9vh] text-[0.75rem]'>
        {`겨울마다 이 골목에서 붕어빵 먹던 기억이 나네요...
          이젠 못먹는 게 아쉬워요`}
      </p>
      <div className='flex gap-[6px] mt-[0.947vh] mb-[1.78vh]'>
        <Tag label={'따뜻함'} />
        <Tag label={'후암동'} />
        <Tag label={'사라진 가게'} />
      </div>
    </div>
  )
}

export default Post
