import { useState, useEffect } from 'react'
import Close from '@/assets/Close.svg'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/shared/Button'

const RecommendedInfo = ({
  current,
  placeName,
  status,
  address,
  summary,
  tags = [],
  image,
  onClose,
}) => {
  const navigate = useNavigate()
  const [addressReady, setAddressReady] = useState(false)
  const [latLng, setLatLng] = useState({ lat: null, lng: null })
  const finalLocation = current

  useEffect(() => {
    const { kakao } = window
    if (!kakao) return

    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(address, (result, resultStatus) => {
      if (resultStatus === kakao.maps.services.Status.OK && result?.length > 0) {
        setLatLng({ lat: result[0].y, lng: result[0].x })
        setAddressReady(true)
      } else {
        setAddressReady(false)
      }
    })
  }, [address])

  const goToMap = () => {
    if (!finalLocation.lat || !finalLocation.lng || !addressReady) return

    const marker = {
      title: placeName,
      status,
      address,
      summary_card: summary,
      emotions: tags,
      lat: latLng.lat,
      lng: latLng.lng,
      previous_lng: finalLocation.lng || null,
      previous_lat: finalLocation.lat || null,
    }
    navigate('/map', { state: { markers: [marker] } })
  }

  return (
    <div className='fixed inset-0 bg-[rgba(173,173,173,0.5)] pt-[10vh] z-[1000]'>
      <div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] max-w-[400px] bg-white rounded-[20px] shadow-lg pt-4 p-6 z-[2000]'>
        <div className='flex justify-end mr-2 mb-2'>
          <img src={Close} onClick={onClose} className='cursor-pointer' />
        </div>

        <img
          src={image}
          className='bg-grey-100 w-[80vw] object-cover aspect-[10/8] rounded-[10px] mb-2'
        />

        <div className='flex justify-between items-center mb-2 bg-primary-300 pt-3 pb-3 pl-5 pr-5 rounded-[10px]'>
          <h2 className='m-0 font-[Bold] text-xl max-w-[40vw] flex-wrap'>{placeName}</h2>
          <span
            className={`text-sm px-3 py-1 min-w-[55px] rounded-full border font-[SemiBold] select-none ${
              status === '폐업함'
                ? 'bg-[#FDF2F8] text-[#BE195D] border-[#BE195D]'
                : status === '이전함'
                  ? 'bg-[#EFFDF4] text-[#17A34A] border-[#17A34A]'
                  : 'bg-[#DBE9FE] text-[#2463EB] border-[#2463EB]'
            }`}
          >
            {status}
          </span>
        </div>

        <div className='bg-primary-300 pt-5 pb-3 pl-5 pr-5 rounded-[10px] mb-2'>
          <p className='text-m text-black mb-2 whitespace-pre-wrap'>
            <strong className='mr-1'>주소:</strong> {address}
          </p>
          <p className='text-m leading-relaxed text-black mb-2'>
            <strong className='mr-1'>요약:</strong> {summary}
          </p>
          <div className='flex gap-1 flex-wrap mb-2'>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className='text-xs text-gray-600 border border-[#ADADAD] px-2 py-1 rounded-[50px] select-none bg-[#FFFEFC]'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={goToMap}
          disabled={!finalLocation.lat || !finalLocation.lng || !addressReady}
          type='submit'
          label='지도에서 보기'
        />
      </div>
    </div>
  )
}

export default RecommendedInfo
