import { useState, useEffect } from 'react'

const usePlaceSearch = (keyword) => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (!keyword) return

    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const searchMarkers = data
          .filter((place) => place.address_name.includes('용산구'))
          .map((place) => ({
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
            title: place.place_name,
          }))
        setMarkers(searchMarkers)
      } else {
        setMarkers([])
      }
    })
  }, [keyword])

  return markers
}

export default usePlaceSearch
