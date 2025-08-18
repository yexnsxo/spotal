import { useState, useEffect } from 'react'
import axios from 'axios'

const usePlaceSearch = (keyword) => {
  const [markers, setMarkers] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!keyword) {
      setMarkers([])
      setStatus('idle')
      return
    }

    const fetchDBMarkers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/search/store/', {
          params: { q: keyword },
        })
        console.log(res.data)

        const emotionNames = res.data.store?.emotions
          ? res.data.store.emotions.map((e) => e.name)
          : []

        return [
          {
            lat: res.data.latitude,
            lng: res.data.longitude,
            title: res.data.store.name,
            address: res.data.store.address,
            status: res.data.store.status,
            summary_card: res.data.summary_card,
            photos: res.data.photos,
            emotions: emotionNames,
          },
        ]
      } catch (err) {
        console.log(err)
        return []
      }
    }

    fetchDBMarkers().then((dbMarkers) => {
      const ps = new kakao.maps.services.Places()
      ps.keywordSearch(keyword, (data, searchStatus) => {
        let yongsanMarkers = []

        if (searchStatus === kakao.maps.services.Status.OK) {
          yongsanMarkers = data
            .filter((place) => place.address_name.includes('용산구'))
            .map((place) => ({
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
              title: place.place_name,
            }))

          const combinedMarkers = [...yongsanMarkers, ...dbMarkers]

          if (combinedMarkers.length > 0) {
            setMarkers(combinedMarkers)
            setStatus('success')
          } else {
            setMarkers([])
            if (searchStatus === kakao.maps.services.Status.OK) {
              setStatus('noYongsan')
            } else {
              setStatus('noResults')
            }
          }
        }
      })
    })
  }, [keyword])

  return { markers, status }
}

export default usePlaceSearch
