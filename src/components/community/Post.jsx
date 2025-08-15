import React, { useState } from 'react'
import Tag from './Tag.jsx'
import ImageSlider from './ImageSlider.jsx'

const Post = ({ text, list }) => {
  const [expanded, setExpanded] = useState(false)

  const displayedText = expanded ? text : text.length > 25 ? text.slice(0, 25) : text

  return (
    <div className='flex flex-col relative px-[3.846vw] w-[76.67vw] rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] bg-white'>
      <div className='flex gap-[0.5rem] items-center ml-[0.5vw] mt-[1.6vh]'>
        <img className='w-[5.13vw] h-[5.13vw] rounded-full bg-grey-100 border-none' />
        <p className='font-[Medium] text-[0.75rem]'>사용자 1</p>
      </div>
      <ImageSlider list={list} />
      <div className='flex mt-[1.9vh] text-[0.75rem]'>
        <p className='whitespace-pre-line'>{displayedText}</p>
        {text.length > 25 && (
          <button className='text-grey-300 ml-[0.2rem]' onClick={() => setExpanded(true)}>
            {expanded ? '' : '더 보기'}
          </button>
        )}
      </div>
      <div className='flex gap-[6px] mt-[0.947vh] mb-[1.78vh]'>
        <Tag label={'따뜻함'} />
        <Tag label={'후암동'} />
        <Tag label={'사라진 가게'} />
      </div>
    </div>
  )
}

export default Post
