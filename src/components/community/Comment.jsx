import CommentMenu from './CommentMenu'
import Message from '@/assets/Message.svg?react'
import axios from 'axios'
import { baseURL } from '@/pages/Signup'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import ArrowUp from '@/assets/ArrowUp.svg?react'
import RecommentArrow from '@/assets/RecommentArrow.svg?react'
import ReComment from './ReComment'

const Comment = ({ c, onDeleted }) => {
  const currentUserId = localStorage.getItem('user.id')
  const currentUserNickname = localStorage.getItem('user.nickname')
  const [recomments, setRecomments] = useState([])
  const [recomment, setRecomment] = useState('')
  const [open, setOpen] = useState(false)

  const readRecomment = (commentId) => {
    axios
      .get(`${baseURL}/community/replies/?comment_id=${commentId}`)
      .then((res) => {
        setRecomments(res.data)
      })
      .catch((err) => console.log(err))
  }

  const postReComment = () => {
    axios
      .post(`${baseURL}/community/comments/`, {
        content: recomment,
        user_id: currentUserId,
        parent: c.comment_id,
      })
      .then((res) => {
        console.log(res)
        const newComment = res.data?.data ?? {
          comment_id: res.data?.id,
          user_id: Number(currentUserId),
          nickname: currentUserNickname,
          content: recomment,
        }
        setRecomments((prev) => [newComment, ...prev])
        setRecomment('')
        toast('🟢 답글 작성이 완료되었습니다')
      })
      .catch((err) => {
        console.log(err)
        console.error('STATUS:', err.response?.status)
        console.error('DATA  :', err.response?.data)
        toast('🔴 답글 작성에 실패하였습니다')
      })
  }

  return (
    <div>
      <div className='flex justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]'>
        <div className='flex gap-[0.7rem]'>
          <img className='w-[5.13vw] h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-grey-100 border-none' />
          <div className='gap-[0.5rem] items-center'>
            <p className='font-[Medium] text-[10px]'>{c.nickname}</p>
            <p className='text-[11px]'>{c.content}</p>
          </div>
        </div>
        <div>
          {Number(c.user_id) === Number(currentUserId) && (
            <CommentMenu comment_id={c.comment_id} onDeleted={onDeleted} />
          )}
          <button
            onClick={() => {
              setOpen((o) => !o)
              readRecomment(c.comment_id)
            }}
          >
            <Message className='cursor-pointer' />
          </button>
        </div>
      </div>

      {open && (
        <>
          {recomments.reverse().map((r) => (
            <div key={c.comment_id}>
              <ReComment r={r} />
            </div>
          ))}
          <div className='flex justify-center items-center gap-[7px]'>
            <RecommentArrow />
            <div className='w-full h-[3.55vh] bg-gray-100 rounded-[10px] my-[1.6vh] flex items-center justify-between'>
              <input
                className='ml-[0.9rem] flex-1 text-[10px] placeholder:text-gray-300 focus:outline-none'
                placeholder='답글을 입력해주세요'
                value={recomment}
                onChange={(e) => setRecomment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') postReComment()
                }}
              />
              <ArrowUp className='mr-[0.9rem] w-[15px] cursor-pointer' onClick={postReComment} />
            </div>
          </div>
        </>
      )}
      <hr className='text-gray-100 mt-[5px]' />
    </div>
  )
}

export default Comment
