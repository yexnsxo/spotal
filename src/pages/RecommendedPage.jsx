import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import RecommendedPlaces from '@/components/recommend/RecommendedPlaces'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Dropdown from '@/components/community/Dropdown'

const RecommendedPage = () => {
  const location = useLocation()
  const { placeData, years } = location.state || {}

  useEffect(() => {
    document.body.classList.add('scrollbar-hide')
    return () => document.body.classList.remove('scrollbar-hide')
  }, [])

  return (
    <div className='mx-auto overflow-y-auto max-h-[100vh] scrollbar-hide bg-white w-full max-w-[768px]'>
      <Header label={'유사 가게 추천 결과'}></Header>
      <div className='mt-[80px] items-center w-[80%] mx-auto flex flex-col gap-4 mb-[100px]'>
        <div className='flex justify-end'>{years && <Dropdown label={'년도'} />}</div>
        {Array.isArray(placeData) && placeData.length > 0 ? (
          placeData.map((place) => (
            <RecommendedPlaces
              key={place.shop_id}
              placeName={place.name}
              status='운영중'
              address={place.address}
              summary={place.ai_summary}
              tags={place.emotions}
              image={place.image_url}
            />
          ))
        ) : (
          <p className='text-gray-500'>추천 장소가 없습니다.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default RecommendedPage
