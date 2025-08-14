import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import Marker from './Marker'

const KakaoMap = ({ center, markers }) => {
  return (
    <Map
      center={center}
      level={3}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {markers.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} placeName={marker.title}></Marker>
      ))}
    </Map>
  )
}

export default KakaoMap
