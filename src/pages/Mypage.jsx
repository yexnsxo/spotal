import DefaultImg from '@/assets/DefaultProfileImg.svg'
import ImageSlider from '@/components/community/ImageSlider'
import Footer from '@/components/shared/Footer.jsx'
import { useNavigate } from 'react-router-dom'
import { CardCarousel } from '@/components/mypage/CardCarousel.jsx'
import { baseURL } from './Signup'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

const Mypage = () => {
  // 로컬스토리지로부터 현재 로그인한 유저 아이디 받아오기
  const userId = Number(localStorage.getItem('user.id'))

  // 받아온 유저 아이디 토대로 서버에서 유저 정보 받아오기
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

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

  const checkLogin = () => {
    if (!userId) {
      toast('🔴 로그인이 상태가 아닙니다.')
    } else {
      localStorage.removeItem('user.id')
      toast('🟢 로그아웃이 완료되었습니다')
      navigate('/login')
    }
  }

  const uploadImg = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    if (!file) return

    const formData = new FormData()
    formData.append('profile_image', file)
    try {
      const res = await axios.put(`${baseURL}/api/users/user-profile/${userId}/`, formData, {})
      toast('🟢 프로필 이미지가 업로드되었습니다.')
      location.reload()
    } catch (err) {
      console.error(err.response?.data)
      toast('🔴 이미지 업로드에 실패했습니다.')
    }
  }

  return (
    <div className='relative overflow-auto max-h-[100vh] min-h-screen scrollbar-hide max-w-[768px] w-full mx-auto bg-white'>
      {/* 마이페이지 상위 배경 화면 */}
      <div className='w-full h-[19.312vh] md:h-[22vh] bg-primary'></div>
      {/* 마이페이지 유저 사진 */}
      <div className='absolute top-[19.312vh] right-[7.5vw] max-h-2 flex flex-col items-center'>
        <img
          className='md:right-[3.3rem] aspect-square transform -translate-y-1/2 w-[25.64vw] h-[25.64vw] md:w-[11rem] md:h-[11rem] rounded-full bg-primary-200 border-[2px] border-white object-cover'
          src={userInfo?.user?.profile_image_url || DefaultImg}
        />
        {userInfo?.user?.profile_image_url == null && (
          <>
            <input
              type='file'
              id='fileInput'
              accept='image/*'
              onChange={uploadImg}
              style={{ display: 'none' }}
            />
            <label
              htmlFor='fileInput'
              className='mt-[-5vh] min-h-[4.5vh] text-sm font-[Bold] w-[25.64vw] rounded-[10px] md:w-[9.5rem] md:h-[1rem] bg-[#FDDDA7] flex items-center justify-center cursor-pointer'
            >
              사진 업로드
            </label>
          </>
        )}
      </div>
      {/* 마이페이지 유저 정보(유저 닉네임, 유저 AI 한줄소개) */}
      <div className='flex flex-col gap-[1.57vh] w-full h-[22vh] pl-[30px]'>
        <h3 className='mt-[4.74vh] font-[Bold] text-[24px]'>{userInfo?.user?.nickname ?? ''}</h3>
        <p className='text-[1rem] whitespace-pre-line mt-[2vh] pb-[2rem]'>
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
              {userInfo?.bookmarks?.map((b, index) => {
                return (
                  <div key={`memory-${index}`} className='shrink-0 snap-start overflow-hidden'>
                    <ImageSlider
                      w='96px'
                      urllist={b?.images}
                      onClick={() => {
                        navigate(`/post/${b.memory_id}`)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {/* 감정 보관함 */}
      <div className='flex flex-col mt-[4.38vh] mb-[5vh]'>
        <p className='ml-[70px] text-[18px] font-[Bold] text-primary'>감정보관함</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='mt-[3.08vh]'>
          <CardCarousel placeData={userInfo?.saved_places ?? []} />
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <button
          className='w-[90%] h-[6vh] mb-[10vh] font-[Bold] py-2.5 rounded-[10px] text-xl cursor-pointer select-none transition-colors duration-300 bg-primary hover:bg-primary hover:text-white text-white'
          onClick={checkLogin}
        >
          로그아웃
        </button>
      </div>
      <Footer selectedMenu='my' />
    </div>
  )
}

export default Mypage
