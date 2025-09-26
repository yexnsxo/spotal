import * as React from 'react'

import EmotionCard from '@/components/mypage/EmotionCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function CardCarousel({ placeData }) {
  return (
    <Carousel opts={{ align: 'center' }} plugins={[]} className={''} setApi={''}>
      <CarouselContent className={''}>
        {Array.from({ length: Math.ceil(placeData.length / 2) }).map((_, i) => (
          <CarouselItem key={i} className='flex justify-center items-center pb-[1vh]'>
            <div className='grid grid-rows-2 gap-2'>
              {placeData.slice(i * 2, i * 2 + 2).map((place, j) => (
                <EmotionCard
                  key={`${i}-${j}`}
                  placeName={place.name}
                  status={place.status}
                  address={place.address}
                  summary={place.summary}
                  tags={place.emotions}
                  url={place.image_url}
                />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {placeData.length > 2 && (
        <div className='flex justify-center gap-4 mt-4'>
          <CarouselPrevious className='static translate-y-0 border-[#eaeaea] cursor-pointer' />
          <CarouselNext className='static translate-y-0 border-[#eaeaea] cursor-pointer' />
        </div>
      )}
    </Carousel>
  )
}
