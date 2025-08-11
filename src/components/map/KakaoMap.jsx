import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const KakaoMap = ({ center, isMarker }) => {
  return (
    <Map
      center={center}
      level={3}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {isMarker && <MapMarker position={center}></MapMarker>}
    </Map>
  )
}

export default KakaoMap
