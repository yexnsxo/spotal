import React from 'react'

const AuthBtn = ({ onClick, text }) => {
  return (
    <div>
      <button
        className='w-[88.2vw] h-[51px] rounded-[10px] bg-primary text-white text-[1.25rem] font-[SemiBold] cursor-pointer'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}

export default AuthBtn
