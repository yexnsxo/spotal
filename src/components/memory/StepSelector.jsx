import React, { useState, useEffect } from 'react'
import Return from '@/assets/return.svg'
import Highlight1 from '@/assets/Highlight1.svg'
import Highlight2 from '@/assets/Highlight2.svg'
import Memory1 from '@/assets/Memory1.svg'
import Memory2 from '@/assets/Memory2.svg'

const StepSelector = ({ step, selected, onSelect, onNext, onPrev }) => {
  const [highlightSrc, setHighlightSrc] = useState(null)
  const [highlightClass, setHighlightClass] = useState('')

  const steps = [
    {
      title: `그 감정을 느꼈던 동네는\n어디였나요?`,
      subtitle: '',
      options: ['이태원', '한남동', '후암동', '효창동', '용문동', '청파동', '해방촌'],
      src: Memory2,
      button: '결과 보기',
      highlight: Highlight2,
      highlightClass: 'absolute top-[20vh] left-[10%] w-[50%] z-0', // step1 위치
    },
    {
      title: '그 때 어떤 감정을 느꼈나요?',
      subtitle: '가게에서 느꼈던 감정을 선택해주세요 (최대 3개)',
      options: ['상쾌함', '편안함', '조용함', '활기참', '소박함', '세련됨'],
      src: Memory1,
      button: '다음',
      highlight: Highlight1,
      highlightClass: 'absolute top-[19vh] w-[32vw] text-start z-0', // step2 위치
    },
  ]

  useEffect(() => {
    setHighlightSrc(currentStep.highlight)
    setHighlightClass(currentStep.highlightClass)
  }, [step])

  const currentStep = steps[step]

  const handleClick = (option) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option))
    } else if (!currentStep.subtitle || (currentStep.subtitle && selected.length < 3)) {
      onSelect([...selected, option])
    }
  }

  return (
    <div className='w-screen h-screen bg-[rgba(173,173,173,0.5)] pt-[5vh] relative'>
      <div className='w-screen h-screen bg-white rounded-t-[50px] p-6 shadow-lg flex flex-col relative'>
        <img src={Return} onClick={onPrev} className='w-3 h-4 mt-[8vh] ml-2 cursor-pointer z-10' />
        {/*<img src={highlightSrc} alt='highlight' className={highlightClass} />*/}
        <div className='grid justify-items-start ml-5 mb-[8vh] z-10'>
          <h2 className='whitespace-pre-line text-[6vw] mt-[2vh] font-[ExtraBold] mb-[0.5vh] text-gray-800 text-start z-10'>
            {currentStep.title}
          </h2>
          {currentStep.subtitle && (
            <p className='text-[3.5vw] text-gray-500 mb-[2vh] text-center z-10'>
              {currentStep.subtitle}
            </p>
          )}
        </div>
        <div className='absolute top-[32vh] grid grid-cols-3 gap-3 mb-9 flex-1 overflow-y-auto w-[75%] z-10'>
          {currentStep.options.map((option) => {
            const isSelected = selected.includes(option)
            return (
              <button
                key={option}
                className={`ml-3 px-[3vw] py-[1vh] text-[3.6vw] rounded-full border transition-colors duration-200 ${
                  isSelected
                    ? 'bg-[#FFF8EC] border-[#FFBA42] text-[#FFBA42]'
                    : 'bg-white border-[#ADADAD] text-[#828282]'
                }`}
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
        <div className='absolute bottom-[20vh] left-1/2 -translate-x-1 z-10'>
          <img src={currentStep.src} alt='character' />
        </div>
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className={`absolute bottom-[14vh] left-1/2 -translate-x-1/2 w-[75%] h-[6vh] py-3 rounded-lg text-center transition-colors duration-200 z-10 ${
            selected.length === 0
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary'
          }`}
        >
          {currentStep.button}
        </button>
      </div>
    </div>
  )
}

export default StepSelector
