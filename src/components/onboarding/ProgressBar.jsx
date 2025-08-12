import React from 'react'
import Return from '../../assets/return.svg'

const ProgressBar = (step, totalSteps) => {
  return (
    <div className='flex ml-[5.9vw] mt-[25.48px]'>
      <img className='mr-[3.44vw] w-[6.58px] h-[15.28px]' src={Return} alt='Return' />
      <div className='flex items-center justify-between gap-[2.56vw]'>
        <div className='w-[25.64vw] h-[0.59vh] rounded-[12.8vw] bg-primary'></div>
        <div className='w-[25.64vw] h-[0.59vh] rounded-[12.8vw] bg-grey-200'></div>
        <div className='w-[25.64vw] h-[0.59vh] rounded-[12.8vw] bg-grey-200'></div>
      </div>
    </div>
  )
}

export default ProgressBar
