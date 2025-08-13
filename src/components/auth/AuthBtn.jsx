import React from 'react'

const AuthBtn = ({ onClick, text, bg }) => {
  return (
    <div>
      <button
        className={`w-[88.2vw] h-[6.04vh] min-[51px] rounded-[10px] ${bg} text-white text-[1.25rem] font-[SemiBold] cursor-pointer`}
        onClick={onClick}
        type='submit'
      >
        {text}
      </button>
    </div>
  )
}

export default AuthBtn
