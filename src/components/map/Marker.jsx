import { MapMarker } from 'react-kakao-maps-sdk'
import Marker1 from '@/assets/Marker1.svg'
import Marker2 from '@/assets/Marker2.svg'

const Marker = ({ position, placeName, state = '운영중', onClick }) => {
  const markerSrc = state === '운영중' ? Marker1 : Marker2

  return (
    <MapMarker
      position={position}
      onClick={() => onClick({ lat: position.lat, lng: position.lng, placeName, state })}
      image={{
        src: markerSrc,
        size: { width: 24, height: 30 },
      }}
    />
  )
}

export default Marker
