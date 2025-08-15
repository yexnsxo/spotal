import React from 'react'
import { useLocation } from 'react-router-dom'
import RecommendedPlaces from '@/components/recommend/RecommendedPlaces'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

const RecommendedPage = () => {
  const location = useLocation()
  const { placeData } = location.state || {}

  {
    /*넘어온 값을 바탕으로 로직 처리*/
  }

  return (
    <div>
      <Header label={'유사 가게 추천 결과'}></Header>
      <div className='mt-[80px] w-[80%] mx-auto flex flex-col gap-4 mb-[80px]'>
        {/*로직 처리 후, 추천 장소 컴포넌트 차례대로 추가*/}
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
        <RecommendedPlaces
          placeName={placeData.placeName}
          status={placeData.status}
          address={placeData.address}
          summary={placeData.summary}
          tags={placeData.tags}
        />
      </div>
      <Footer></Footer>
    </div>
  )
}

export default RecommendedPage
