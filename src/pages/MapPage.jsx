import { useLocation } from 'react-router-dom'
import MapContainer from '@/components/map/MapContainer'
import InfoContainer from '@/components/map/InfoContainer'

const MapPage = () => {
  const location = useLocation()
  const { searchKeyword } = location.state || {}

  console.log('받은 검색어:', searchKeyword)
  return (
    <div>
      <MapContainer keyword={searchKeyword} />
    </div>
  )
}

export default MapPage
