import CommentMenu from './CommentMenu'

const Comment = ({ c, onDeleted }) => {
  const currentUserId = localStorage.getItem('user.id')
  return (
    <div>
      <div className='flex justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]  mt-[1.6vh]'>
        <div className='flex gap-[0.7rem]'>
          <img className='w-[5.13vw] h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-grey-100 border-none' />
          <div className='gap-[0.5rem] items-center'>
            <p className='font-[Medium] text-[10px]'>{c.nickname}</p>
            <p className='text-[11px]'>{c.content}</p>
          </div>
        </div>
        {Number(c.user_id) === Number(currentUserId) && (
          <CommentMenu comment_id={c.comment_id} onDeleted={onDeleted} />
        )}
      </div>
      <hr className='text-gray-100 mt-[5px]' />
    </div>
  )
}

export default Comment
