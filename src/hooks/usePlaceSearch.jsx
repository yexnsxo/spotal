import { useState, useEffect } from 'react'
import axios from 'axios'

const usePlaceSearch = () => {
  const [marker, setMarker] = useState([])
  const [status, setStatus] = useState('idle')

  const fetchMarker = async (keyword) => {
    if (!keyword.trim()) return { marker: [], status: 'idle' }

    setStatus('loading')
    try {
      const res = await axios.get('http://127.0.0.1:8000/search/store/', {
        params: { q: keyword },
      })

      if (res.data && res.data.store) {
        const emotionNames = res.data.store.emotions?.map((e) => e.name) || []
        const newMarker = [
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
        setMarker(newMarker)
        setStatus('success')
        return { marker: newMarker, status: 'success' }
      } else {
        setMarker([])
        setStatus('noResults')
        return { marker: [], status: 'noResults' }
      }
    } catch {
      setMarker([])
      setStatus('noResults')
      return { marker: [], status: 'noResults' }
    }
  }

  return { fetchMarker }
}

export default usePlaceSearch
