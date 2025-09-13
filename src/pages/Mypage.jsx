import DefaultImg from '@/assets/DefaultProfileImg.svg'
import ImageSlider from '@/components/community/ImageSlider'
import Footer from '@/components/shared/Footer.jsx'
import { CardCarousel } from '@/components/mypage/CardCarousel.jsx'
import { baseURL } from './Signup'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Mypage = () => {
  // 로컬스토리지로부터 현재 로그인한 유저 아이디 받아오기
  const userId = Number(localStorage.getItem('user.id'))

  // 받아온 유저 아이디 토대로 서버에서 유저 정보 받아오기
  const [userInfo, setUserInfo] = useState(null)

  const getUserInfo = () => {
    axios
      .get(`${baseURL}/mypage/${userId}/`)
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getUserInfo()
  }, [userId])

  return (
    <div className='relative overflow-auto max-h-[100vh] min-h-screen scrollbar-hide max-w-[768px] w-full mx-auto bg-white'>
      {/* 마이페이지 상위 배경 화면 */}
      <div className='w-full h-[19.312vh] md:h-[22vh] bg-primary'></div>
      {/* 마이페이지 유저 사진 */}
      <div>
        <img
          className='absolute top-[19.312vh] right-[7.5vw] md:right-[3.3rem] transform -translate-y-1/2 w-[25.64vw] h-[25.64vw] md:w-[11rem] md:h-[11rem] rounded-full bg-primary-200 border-[2px] border-white'
          src={DefaultImg}
        />
        {/* 사진 업로드 버튼 추가 */}
      </div>
      {/* 마이페이지 유저 정보(유저 닉네임, 유저 AI 한줄소개) */}
      <div className='flex flex-col gap-[1.57vh] w-full h-[22vh] pl-[30px]'>
        <h3 className='mt-[4.74vh] font-[Bold] text-[24px]'>{userInfo?.user?.nickname ?? ''}</h3>
        <p className='text-[1rem] whitespace-pre-line pb-[2rem]'>
          {/* 유저 AI 한줄 소개가 없으면 당신의 기억을 따라가다 보면.. \n 어느새 당신의 취향과 마주하게 될 거예요! 로 대체 */}
          {userInfo?.user?.detail?.trim() === ''
            ? '당신의 기억을 따라가다 보면.. \n 어느새 당신의 취향과 마주하게 될 거예요!'
            : userInfo?.user?.detail}
        </p>
      </div>
      {/* 북마크 */}
      <div className='bg-[#f8f8f8] flex flex-col justify-center pt-[1.78vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>북마크</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='flex flex-col ml-[8vw] md:ml-[2.5rem] py-[3.1vh]'>
          <p className='text-gray-200 text-[12px]'>스크랩한 글이 이곳에 저장됩니다.</p>
          {/* 스크랩한 글이 있을 때만 북마크 이미지 보여줌 */}
          {userInfo?.bookmarks?.length > 0 && (
            <div className='flex gap-[3.33vw] mt-[5px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {userInfo?.bookmarks?.map((b) => {
                return (
                  <div key={b.memory_id} className='shrink-0 snap-start overflow-hidden'>
                    <ImageSlider w='96px' urllist={b?.images} />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {/* 감정 보관함 */}
      <div className='flex flex-col mt-[4.38vh] mb-[10vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>감정보관함</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='mt-[3.08vh]'>
          <CardCarousel placeData={userInfo?.saved_places ?? []} />
        </div>
      </div>
      {/* 이곳에 로그아웃 버튼 추가 예정 */}
      <Footer selectedMenu='my' />
    </div>
  )
}

export default Mypage
