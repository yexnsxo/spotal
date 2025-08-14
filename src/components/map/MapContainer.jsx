import React, { useState, useEffect } from 'react'
import KakaoMap from './KakaoMap'

const MapContainer = ({ keyword }) => {
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 })
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저에서는 위치 정보가 지원되지 않습니다.')
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
      },
      (err) => {
        console.error('위치 정보를 가져올 수 없습니다:', err)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  useEffect(() => {
    if (!keyword) return

    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const searchMarkers = data.map((place) => ({
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
          title: place.place_name,
        }))

        setCenter({
          lat: parseFloat(data[0].y),
          lng: parseFloat(data[0].x),
        })

        setMarkers(searchMarkers)
      }
    })
  }, [keyword])

  return (
    <div>
      <KakaoMap center={center} markers={markers} />
    </div>
  )
}

export default MapContainer
