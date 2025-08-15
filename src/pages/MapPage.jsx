import { useLocation } from 'react-router-dom'
import MapContainer from '@/components/map/MapContainer'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

const MapPage = () => {
  const location = useLocation()
  const { searchKeyword } = location.state || {}

  console.log('받은 검색어:', searchKeyword)
  return (
    <div>
      <Header label={'검색 결과'}></Header>
      <MapContainer keyword={searchKeyword} />
      <Footer></Footer>
    </div>
  )
}

export default MapPage
