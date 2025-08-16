import { useState, useEffect } from 'react'

const usePlaceSearch = (keyword) => {
  const [markers, setMarkers] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!keyword) {
      setMarkers([])
      setStatus('idle')
      return
    }

    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(keyword, (data, searchStatus) => {
      if (searchStatus === kakao.maps.services.Status.OK) {
        const yongsanMarkers = data
          .filter((place) => place.address_name.includes('용산구'))
          .map((place) => ({
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
            title: place.place_name,
          }))

        if (yongsanMarkers.length > 0) {
          setMarkers(yongsanMarkers)
          setStatus('success')
        } else {
          setMarkers([])
          setStatus('noYongsan')
        }
      } else {
        setMarkers([])
        setStatus('noResults')
      }
    })
  }, [keyword])

  return { markers, status }
}

export default usePlaceSearch
