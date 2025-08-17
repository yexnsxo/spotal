import React, { useState, useEffect, useRef } from 'react'
import PostMenuSvg from '@/assets/PostMenu.svg'

const PostMenu = () => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onMouseDown, { capture: false })
    return () => document.removeEventListener('mousedown', onMouseDown, { capture: false })
  }, [open])
  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className='cursor-pointer'
      >
        <img src={PostMenuSvg} alt='메뉴 열기' />
      </button>
      {open && (
        <div className='flex flex-col bg-white rounded-[10px] w-[18.72vw] mt-[1px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full right-[-10px] z-40'>
          <button className='py-[0.5rem] hover:bg-primary-300 cursor-pointer'>수정하기</button>
          <button className='py-[0.5rem] hover:bg-primary-300 cursor-pointer'>삭제하기</button>
        </div>
      )}
    </div>
  )
}

export default PostMenu
