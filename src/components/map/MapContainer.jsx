import React, { useState, useEffect } from 'react'
import KakaoMap from './KakaoMap'
import usePlaceSearch from '@/hooks/usePlaceSearch'

const MapContainer = ({ markers }) => {
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

  return (
    <div>
      <KakaoMap markers={markers} />
    </div>
  )
}

export default MapContainer
