import { useEffect, useState } from 'react'
import Header from '@/components/shared/Header.jsx'
import Footer from '@/components/shared/Footer.jsx'
import Dropdown2 from '@/components/community/Dropdown2.jsx'
import { emotionList, locationList } from '@/components/community/Dropdown.jsx'
import Button from '@/components/shared/Button.jsx'
import ImageUploader from '@/components/community/ImageUploader.jsx'
import { useFormFilled } from '@/hooks/useFormFilled'
import { baseURL } from './Signup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const WritePage = () => {
  const labelClass = 'font-[Medium] text-[1rem]'
  const divClass = 'flex flex-col gap-[1.54vh]'
  const [images, setImages] = useState([])
  const navigate = useNavigate()

  const { values, handleChange, isFilled } = useFormFilled({
    text: '',
    location: null,
    emotion: [],
  })

  useEffect(() => {
    axios
      .get(`${baseURL}/community/memories/tag-options`)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const postWriteRequest = () => {
    const formData = new FormData()
    formData.append('content', values.text)
    ;(values.emotion ?? []).forEach((id) => {
      formData.append('emotion_id', String(id))
    })

    if (values.location != null) {
      formData.append('location_id', String(values.location))
    }

    ;(images ?? []).forEach((file) => {
      formData.append('images', file)
    })
    formData.append('user_id', localStorage.getItem('user.id'))
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
    axios
      .post(`${baseURL}/community/memories/`, formData)
      .then((res) => {
        console.log(res)
        navigate('/post')
      })
      .catch((err) => {
        console.log('status', err.response?.status)
        console.log('body', err.response?.data)
      })
  }

  return (
    <div>
      <Header label={'글 작성하기'} />
      <div className='bg-white flex justify-center'>
        <div className='w-[81.025vw] mt-[13.98vh] bg-primary-300 rounded-[10px]'>
          <form className='flex flex-col gap-[3.31vh] px-[4.872vw] py-[5.213vh]'>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>이미지 추가</label>
              <ImageUploader urllist={images} onChange={setImages} />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>내용 작성</label>
              <textarea
                className='w-[71.794vw] h-[9.834vh] bg-[#ffffff] focus:outline-none focus:border-primary rounded-[9px] resize-none border-[0.9px] border-grey-200 py-[0.9vh] px-[1.64vw]'
                placeholder='작성할 내용을 입력하세요'
                name='text'
                value={values.text}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>장소 태그 추가</label>
              <Dropdown2
                placeholder='원하는 장소 태그를 선택하세요'
                options={locationList}
                name='location'
                onChange={handleChange}
                value={values.location}
              />
            </div>
            <div className={`${divClass}`}>
              <label className={`${labelClass}`}>감정 태그 추가</label>
              <Dropdown2
                value={values.emotion}
                placeholder='원하는 감정 태그를 선택하세요'
                options={emotionList}
                name='emotion'
                onChange={handleChange}
              />
            </div>
            <Button
              type={'button'}
              onClick={postWriteRequest}
              label={'작성 완료'}
              disabled={!isFilled}
            />
          </form>
        </div>
      </div>
      <Footer selectedMenu='community' />
    </div>
  )
}

export default WritePage
