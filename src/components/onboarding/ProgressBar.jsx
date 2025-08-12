import React from 'react'
import Return from '../../assets/return.svg'

const ProgressBar = () => {
  return (
    <div className='flex ml-[5.9vw]'>
      <img className='mr-[3.44vw]' src={Return} alt='Return' />
      <div className='flex items-center justify-between gap-[2.56vw]'>
        <div className='w-[25.64vw] h-[1.3vh] rounded-[12.8vw] bg-primary'></div>
        <div className='w-[25.64vw] h-[1.3vh] rounded-[12.8vw] bg-grey-200'></div>
        <div className='w-[25.64vw] h-[1.3vh] rounded-[12.8vw] bg-grey-200'></div>
      </div>
    </div>
  )
}

export default ProgressBar
