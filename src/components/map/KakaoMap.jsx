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

  const handleMapClick = () => {
    setIsOpenMarker(false)
  }

  return (
    <Map
      onClick={handleMapClick}
      center={boundCenter}
      level={5}
      style={{ width: '100vw', height: '100vh' }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.title}
          position={{ lat: marker.lat, lng: marker.lng }}
          placeName={marker.title}
          address={marker.address}
          state={marker.status}
          summary={marker.summary_card}
          emotion={marker.emotions}
          onClick={handleMarkerClick}
        />
      ))}

      {isOpenMarker && (
        <InfoContainer
          placeName={selectedMarker.placeName}
          status={selectedMarker.state}
          address={selectedMarker.address}
          summary={selectedMarker.summary}
          tags={selectedMarker.emotion}
        />
      )}
    </Map>
  )
}

export default KakaoMap
