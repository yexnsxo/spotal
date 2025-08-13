import { useState } from 'react'
import BookMark from '@/assets/BookMark.svg'
import BookMark2 from '@/assets/BookMark2.svg'
import RecommendedInfo from './RecommendedInfo'

const RecommendedPlaces = ({ placeName, status, address, summary, tags = [] }) => {
  const [isMarked, setIsMarked] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  const handleOpenInfo = () => {
    setIsInfoOpen(true)
  }
  const handleCloseInfo = () => {
    setIsInfoOpen(false)
  }

  return (
    <>
      <div
        className='max-w-[500px] bg-white rounded-[10px] shadow-lg p-6 pb-4 z-[1000] cursor-pointer'
        onClick={handleOpenInfo}
      >
        <img src='' className='bg-grey-100 w-[80vw] h-[15vh] rounded-[10px] mb-2'></img>
        <div className='flex justify-between items-center mb-2 pt-1 pl-1 rounded-[10px]'>
          <h2 className='m-0 font-bold text-[4.5vw]'>{placeName}</h2>
          <img
            src={isMarked ? BookMark2 : BookMark}
            onClick={(e) => {
              e.stopPropagation()
              setIsMarked((prev) => !prev)
            }}
          />
        </div>
        <div className='flex gap-2 flex-wrap'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='text-[3.2vw] text-[#FFBA42] border border-[#FFBA42] px-2 py-1 rounded-[50px] select-none bg-[#FFF8EC]'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {isInfoOpen && (
        <RecommendedInfo
          placeName={placeName}
          status={status}
          address={address}
          summary={summary}
          tags={tags}
          onClose={handleCloseInfo}
        />
      )}
    </>
  )
}

export default RecommendedPlaces
