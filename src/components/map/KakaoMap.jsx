import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import Marker from './Marker'

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
      {isMarker && <Marker center={center} />}
    </Map>
  )
}

export default KakaoMap
