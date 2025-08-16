import React, { useState } from 'react'
import Header from '@/components/shared/Header.jsx'
import Footer from '@/components/shared/Footer.jsx'
import Dropdown2 from '@/components/community/Dropdown2.jsx'
import { emotionList, locationList } from '@/components/community/Dropdown.jsx'

const WritePage = () => {
  const [location, setLocation] = useState('')
  const [emotion, setEmotion] = useState('')
  const [file, setFile] = useState('')
  const labelClass = 'font-[Medium] text-[1rem]'
  const divClass = 'flex flex-col gap-[1.54vh]'

  return (
    <div>
      <Header label={'글 작성하기'} />
      <div className='bg-white flex justify-center'>
        <div className='w-[81.025vw] h-[63.507vh] mt-[13.98vh] bg-primary-300 rounded-[10px]'>
          <form className='flex flex-col gap-[3.31vh] px-[4.872vw] py-[5.213vh]'>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>이미지 추가</label>
              <label
                htmlFor='image'
                className='inline-flex items-center justify-center
                  w-[31.794vw] h-[4.02vh]
                  rounded-[9px] bg-grey-100 border border-grey-200
                  text-sm cursor-pointer'
              >
                {file || '이미지 파일 추가'}
              </label>
              <input
                id='image'
                type='file'
                accept='image/*'
                className='sr-only'
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  setFile(f ? f.name : '')
                }}
              />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>내용 추가</label>
              <textarea
                className='w-[71.794vw] h-[9.834vh] bg-[#ffffff] focus:outline-none rounded-[9px] resize-none border-[0.9px] border-grey-200 py-[0.5rem] px-[0.4rem]'
                placeholder='작성할 내용을 입력하세요'
              ></textarea>
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>장소 태그 추가</label>
              <Dropdown2
                placeholder='원하는 장소 태그를 선택하세요'
                options={locationList}
                value={location}
                onChange={setLocation}
              />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>감정 태그 추가</label>
              <Dropdown2
                placeholder='원하는 감정 태그를 선택하세요'
                options={emotionList}
                value={emotion}
                onChange={setEmotion}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer selectedMenu='community' />
    </div>
  )
}

export default WritePage
