import { useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import InfoContainer from './InfoContainer'

const Marker = ({ position, placeName }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  const handleMarkerClick = () => {
    if (isInfoVisible == true) {
      setIsInfoVisible(false)
    } else {
      setIsInfoVisible(true)
    }
  }

  return (
    <div>
      <MapMarker position={position} onClick={handleMarkerClick} />

      {isInfoVisible && (
        <InfoContainer
          placeName={placeName}
          status='폐업함'
          address='서울 마포구 염리동 173-21'
          summary='55년이 넘는 세월 동안 연탄불에 구운 납작 불고기로 사랑받았던 용산의 명소.'
          tags={['정성스러움', '소박함', '따뜻함']}
        />
      )}
    </div>
  )
}

export default Marker
