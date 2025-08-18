import DefaultImg from '@/assets/DefaultProfileImg.svg'
import ImageSlider from '@/components/community/ImageSlider'
import Footer from '@/components/shared/Footer.jsx'
import EmotionCard from '@/components/mypage/EmotionCard.jsx'

const Mypage = () => {
  const urlList = ['url1', 'url2', 'url3']
  const placeData = {
    placeName: '역전회관',
    status: '운영 중',
    address: '서울 마포구 염리동 173-21',
    summary: '55년이 넘는 세월 동안 연탄불이랑 어쩌고 저짜고 듀듀',
    tags: ['세심함', '소박함', '따뜻함'],
  }

  return (
    <div className='relative min-height: 100vh'>
      <div className='w-full h-[19.312vh] bg-primary'></div>
      <img
        className='absolute top-[19.312vh] right-[8.72vw] transform -translate-y-1/2 w-[25.64vw] h-[25.64vw] rounded-full bg-primary-200 border-[2px] border-white'
        src={DefaultImg}
      />
      <div className='flex flex-col gap-[1.57vh] w-full h-[18.25vh] pl-[8.21vw]'>
        <h3 className='mt-[4.74vh] font-[Bold] text-[24px]'>숙멋사</h3>
        <p className='text-[1rem]'>따뜻함을 좋아하는 감성탐험가</p>
      </div>
      <div className='bg-[#f8f8f8] flex flex-col justify-center pt-[1.78vh]'>
        <p className='ml-[18.46vw] text-[18px] font-[Bold] text-primary'>북마크</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='flex flex-col gap-[2.47vw] ml-[3.85vw] py-[3.1vh]'>
          <p className='text-gray-200 text-[12px]'>스크랩한 글이 이곳에 저장됩니다.</p>
          <div className='flex gap-[3.33vw] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' list={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' list={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' list={urlList} />
            </div>
            <div className='shrink-0 snap-start overflow-hidden'>
              <ImageSlider w='96px' h='96px' list={urlList} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-[4.38vh] mb-[10vh]'>
        <p className='ml-[18.46vw] text-[18px] font-[Bold] text-primary'>감정보관함</p>
        <hr className='border-primary mt-[1.89vh]' />
        <div className='flex flex-col gap-[1.54vh] justify-center items-center'>
          <EmotionCard
            placeName={placeData.placeName}
            status={placeData.status}
            address={placeData.address}
            summary={placeData.summary}
            tags={placeData.tags}
          />
          <EmotionCard
            placeName={placeData.placeName}
            status={placeData.status}
            address={placeData.address}
            summary={placeData.summary}
            tags={placeData.tags}
          />
        </div>
      </div>
      <Footer selectedMenu='my' />
    </div>
  )
}

export default Mypage
