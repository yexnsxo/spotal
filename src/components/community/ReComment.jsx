import RecommentArrow from '@/assets/RecommentArrow.svg?react'
const ReComment = ({ r }) => {
  return (
    <div className='flex items-center gap-[7px]'>
      <RecommentArrow />
      <div className='flex w-full justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]  mt-[1.6vh]'>
        <div className='flex gap-[0.7rem]'>
          <img className='w-[5.13vw] h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full bg-grey-100 border-none' />
          <div className='gap-[0.5rem] items-center'>
            <p className='font-[Medium] text-[10px]'>{r.nickname}</p>
            <p className='text-[11px]'>{r.content}</p>
          </div>
        </div>
      </div>
      <hr className='text-gray-100 mt-[5px]' />
    </div>
  )
}

export default ReComment
