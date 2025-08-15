import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

function ImageSlider({ list }) {
  const [current, setCurrent] = useState(0)
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className='flex'>
        <ul className='absolute bottom-[35px] left-1/2 -translate-x-1/2 !m-0 !p-0 !flex !gap-[8px] [&>li]:!m-0 [&>li]:!w-auto [&>li]:!h-auto [&>li>button]:!p-0'>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={
          i === current
            ? 'w-[20px] h-[4px] rounded-[100px] bg-white'
            : 'w-[4px] h-[4px] rounded-full bg-grey-200'
        }
      ></div>
    ),
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
  }
  return (
    <div className='slider-container relative w-[68.974vw] mt-[1.6vh] rounded-[10px] overflow-hidden'>
      <Slider {...settings}>
        {list.map((e, i) => (
          <img
            key={`${list}-${i}`}
            className='block w-full h-[29.146vh] bg-grey-100 object-cover'
            alt='골목 과거 사진'
            src={e}
            loading='lazy'
          />
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
