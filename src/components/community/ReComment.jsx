import RecommentArrow from '@/assets/RecommentArrow.svg?react'
import DefaultImg from '@/assets/DefaultProfileImg.svg'
const ReComment = ({ r }) => {
  const profileImg = r?.img_url || DefaultImg
  return (
    <div className='flex items-center gap-[7px]'>
      <RecommentArrow />
      <div className='flex w-full justify-between items-center md:ml-[0rem] md:mr-[0rem] sm:ml-[0.3rem] sm:mr-[0.3rem] ml-[0.3rem] mr-[0.3rem]  mt-[1.6vh]'>
        <div className='flex gap-[0.7rem]'>
          <img
            src={profileImg}
            className='w-[5.13vw] h-[5.13vw] md:w-[2.5rem] md:h-[2.5rem] rounded-full border-none bg-primary-200'
          />
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
