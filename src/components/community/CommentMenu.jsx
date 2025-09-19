import { useState, useRef } from 'react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { baseURL } from '@/pages/Signup'
import axios from 'axios'
import MenuSign from '@/assets/MenuSign.svg?react'
import { toast } from 'sonner'
import CommentMenuSVG from '@/assets/CommentMenu.svg'

const CommentMenu = ({ comment_id, memory_id }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useOutsideClick(rootRef, () => setOpen(false), open)

  const deletePost = () => {
    axios
      .delete(`${baseURL}/community/comments/${comment_id}/`)
      .then(() => {
        toast('🟢 댓글 삭제가 완료되었습니다.')
        window.location.reload()
      })
      .catch((err) => {
        toast('🔴 댓글을 삭제하지 못하였습니다.')
        console.error('STATUS:', err.response?.status)
        console.error('DATA  :', err.response?.data)
      })
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className='cursor-pointer'
      >
        <img src={CommentMenuSVG} />
      </button>
      {open && (
        <div className='flex flex-col bg-white rounded-[10px] w-[15vw] max-w-[100px] mt-[1px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full right-[-10px] z-40 shadow-[0_4px_4px_rgba(0,0,0,0.1)]'>
          <button className='flex justify-center items-center gap-[10px] py-[0.5rem] hover:bg-primary-300 cursor-pointer border-b-[1px] border-gray-100 active:bg-primary-300'>
            수정하기
            <MenuSign />
          </button>
          <button
            className='flex justify-center items-center gap-[10px] py-[0.5rem] hover:bg-primary-300 cursor-pointer active:bg-primary-300'
            onClick={deletePost}
          >
            삭제하기
            <MenuSign />
          </button>
        </div>
      )}
    </div>
  )
}

export default CommentMenu
