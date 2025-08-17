import { useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import Marker from './Marker'
import InfoContainer from './InfoContainer'

const KakaoMap = ({ center, markers }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [isOpenMarker, setIsOpenMarker] = useState(false)
  const [boundCenter, setCenter] = useState(center)

  const handleMarkerClick = (marker) => {
    if (selectedMarker && selectedMarker.placeName === marker.placeName) {
      setIsOpenMarker(false)
      setSelectedMarker(null)
    } else {
      setSelectedMarker(marker)
      setIsOpenMarker(true)
      setCenter({
        lat: marker.lat,
        lng: marker.lng,
      })
    }
  }

  return (
    <Map center={boundCenter} level={5} style={{ width: '100vw', height: '100vh' }}>
      {markers.map((marker) => (
        <Marker
          key={marker.title}
          position={{ lat: marker.lat, lng: marker.lng }}
          placeName={marker.title}
          onClick={handleMarkerClick}
        />
      ))}

      {isOpenMarker && (
        <InfoContainer
          placeName={selectedMarker.placeName}
          status={selectedMarker.state}
          address='서울 마포구 염리동 173-21'
          summary='55년이 넘는 세월 동안 연탄불에 구운 납작 불고기로 사랑받았던 용산의 명소.'
          tags={['정성스러움', '소박함', '따뜻함']}
        />
      )}
    </Map>
  )
}

export default KakaoMap
