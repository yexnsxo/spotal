import { useEffect, useState } from 'react'
import Tag from './Tag.jsx'
import ImageSlider from './ImageSlider.jsx'
import PostMenu from './PostMenu.jsx'
import BookMark from '@/assets/BookMark.svg?react'
import axios from 'axios'
import { baseURL } from '@/pages/Signup.jsx'
import ArrowUp from '@/assets/ArrowUp.svg?react'
import { toast } from 'sonner'
import Comment from './Comment.jsx'
import DefaultImg from '@/assets/DefaultProfileImg.svg'

const PostDetail = ({ postData, memoryId }) => {
  const userId = postData?.user_id ?? null
  const emotionTags = postData?.emotions?.map((e) => (typeof e === 'string' ? e : e.name)) ?? []
  const locationTags = postData?.location?.name ?? ''
  const urllist = postData?.images ?? []
  const text = postData?.content ?? ''
  const memory_id = postData?.memory_id ?? null
  const nickname = postData?.nickname ?? ''
  const [comment, setComment] = useState('')
  const profileImg = postData?.profile_image_url || DefaultImg
  const [sending, isSending] = useState(false)
  const [newCommentData, setNewCommentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [commentData, setCommentData] = useState([])
  const [comments, setComments] = useState([])

  const getPostComment = () => {
    axios
      .get(`${baseURL}/community/comments/?memory_id=${memory_id}`)
      .then((res) => {
        setLoading(false)
        const comments = res?.data
        setCommentData(comments)
        console.log(comments)
      })
      .catch(() => {
        setLoading(false)
        setCommentData([])
      })
  }

  useEffect(() => {
    getPostComment()
    setComments(commentData ?? [])
  }, [commentData])

  const currentUserId = localStorage.getItem('user.id')
  const isUser = currentUserId == userId
  const [isMarked, SetIsMarked] = useState(false)
  const [bookmarkId, SetBookmarkId] = useState(null)

  useEffect(() => {
    let cancelled = false
    axios
      .get(`${baseURL}/community/bookmarks/?user_id=${currentUserId}`)
      .then((res) => {
        const marked = res.data.find((id) => Number(id?.memory) === Number(memory_id))
        const sameUser = res.data.find((user) => Number(user?.user) === Number(currentUserId))
        if (cancelled) return
        if (marked && sameUser) {
          SetIsMarked(true)
          SetBookmarkId(marked.bookmark_id)
        } else {
          SetIsMarked(false)
          SetBookmarkId(null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      cancelled = true
    }
  }, [userId, memory_id, baseURL, currentUserId, bookmarkId])

  const handleBookmark = (isMarked) => {
    if (!isMarked) {
      axios
        .post(`${baseURL}/community/bookmarks/create/`, {
          user_id: currentUserId,
          memory: memory_id,
        })
        .then((res) => {
          SetIsMarked(true)
          SetBookmarkId(res.data.bookmark_id)
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .delete(`${baseURL}/community/bookmarks/${bookmarkId}/delete/?user_id=${currentUserId}`)
        .then((res) => {
          SetIsMarked(false)
        })
        .catch((err) => console.log(err))
    }
  }

  const postComment = () => {
    isSending(true)
    axios
      .post(`${baseURL}/community/comments/`, {
        content: comment,
        user_id: currentUserId,
        memory_id: memory_id,
      })
      .then((res) => {
        isSending(false)
        console.log(res)
        setComment('')
        toast('🟢 댓글 작성이 완료되었습니다')
      })
      .catch((err) => {
        isSending(false)
        console.log(err)
        console.error('STATUS:', err.response?.status)
        console.error('DATA  :', err.response?.data)
        toast('🔴 댓글 작성에 실패하였습니다')
      })
  }

  return (
    <div className='flex flex-col gap-[0.8vh] relative px-[3.846vw] md:px-[40px] w-[76.67vw] md:w-[36.7rem] rounded-[10px] shadow-[0_2px_7px_3px_rgba(0,0,0,0.1)] bg-white'>
      <div className='flex justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]  mt-[1.6vh]'>
        <div className='flex gap-[0.5rem] items-center'>
          <img
            src={profileImg}
            className='w-[5.13vw] aspect-square h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-primary-200 border-none'
          />
          <p className='font-[Medium] text-[0.75rem]'>{nickname}</p>
        </div>
        {isUser && <PostMenu memory_id={memory_id} />}
      </div>
      <div className='h-auto'>
        <ImageSlider w='68.974vw' urllist={urllist} />
      </div>
      <div className='flex items-baseline gap-[5px] h-auto m-0 my-1'>
        <p className='whitespace-pre-line text-[12px]'>{text}</p>
      </div>
      <div className='flex justify-between items-center mb-[1.78vh] md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]'>
        <div className='flex gap-[6px]'>
          {emotionTags.map((tag, idx) => (
            <div key={idx}>
              <Tag label={tag} />
            </div>
          ))}
          <Tag label={locationTags} />
        </div>
        {isUser || (
          <BookMark
            className={`cursor-pointer stroke-[0.3px] h-[1.42rem] mr-[-8px] ${
              isMarked
                ? '[&_*]:fill-primary [&_*]:stroke-primary'
                : '[&_*]:fill-gray-200 [&_*]:stroke-gray-200'
            }`}
            onClick={() => handleBookmark(isMarked)}
          />
        )}
      </div>
      {/* 댓글 */}
      {[...comments].reverse().map((c) => (
        <div key={c.comment_id}>
          <Comment
            c={c}
            onDeleted={(id) => setComments((prev) => prev.filter((c) => c.comment_id !== id))}
          />
        </div>
      ))}
      {/* 댓글 입력창 */}
      <div className='w-full h-[3.55vh] bg-gray-100 rounded-[10px] my-[1.6vh] flex items-center justify-between'>
        <input
          className='ml-[0.9rem] flex-1 text-[10px] placeholder:text-gray-300 focus:outline-none'
          placeholder='댓글을 입력해주세요'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !sending) {
              postComment()
              getPostComment()
            }
          }}
        />
        <ArrowUp className='mr-[0.9rem] w-[15px] cursor-pointer' onClick={postComment} />
      </div>
    </div>
  )
}

export default PostDetail
