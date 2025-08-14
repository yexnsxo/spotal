import React from 'react'
import Return from '../../assets/return.svg'

const Header = ({ label }) => {
  return (
    <div className='flex items-center relative w-[100vw] h-[7.11vh] border-b-[1px] border-b-grey-100 shadow-[0_2px_2px_#EFEFEF]'>
      <img
        src={Return}
        alt='return'
        className='absolute left-[10.384vw] top-1/2 -translate-y-1/2'
      />
      <p className='mx-auto font-[ExtraBold] text-[18px]'>{label}</p>
    </div>
  )
}

export default Header
