import React, { useState } from 'react'
import Header from '@/components/shared/Header.jsx'
import Footer from '@/components/shared/Footer.jsx'
import Dropdown2 from '@/components/community/Dropdown2.jsx'
import { emotionList, locationList } from '@/components/community/Dropdown.jsx'
import Button from '@/components/shared/Button.jsx'
import ImageUploader from '@/components/community/ImageUploader.jsx'

const EditPage = () => {
  const [location, setLocation] = useState('')
  const [emotion, setEmotion] = useState('')
  const labelClass = 'font-[Medium] text-[1rem]'
  const divClass = 'flex flex-col gap-[1.54vh]'
  return (
    <div>
      <Header label={'글 수정하기'} />
      <div className='bg-white flex justify-center'>
        <div className='w-[81.025vw] mt-[13.98vh] bg-primary-300 rounded-[10px]'>
          <form className='flex flex-col gap-[3.31vh] px-[4.872vw] py-[5.213vh]'>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>이미지 추가</label>
              <ImageUploader />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>내용 수정</label>
              {/* 나중에 연동 후 백엔드에서 받아온 값 올릴 예정 */}
              <textarea
                className='w-[71.794vw] h-[9.834vh] bg-[#ffffff] focus:outline-none rounded-[9px] resize-none border-[0.9px] border-grey-200 py-[0.5rem] px-[0.4rem]'
                placeholder='작성할 내용을 입력하세요'
              ></textarea>
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>장소 태그 추가</label>
              <Dropdown2
                placeholder='원하는 장소 태그를 선택하세요'
                options={locationList.slice(1)}
                value={location}
                onChange={setLocation}
              />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>감정 태그 추가</label>
              <Dropdown2
                placeholder='원하는 감정 태그를 선택하세요'
                options={emotionList.slice(1)}
                value={emotion}
                onChange={setEmotion}
              />
            </div>
            <Button type={'submit'} label={'작성 완료'} />
          </form>
        </div>
      </div>
      <Footer selectedMenu='community' />
    </div>
  )
}

export default EditPage
