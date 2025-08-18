import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import Search from '../assets/Search.svg'
import Arrow from '../assets/ArrowUp.svg'
import Footer from '@/components/shared/Footer'
import SearchResults from '@/components/search/SearchResults'
import usePlaceSearch from '@/hooks/usePlaceSearch'
import SearchNoResults from '@/components/search/SearchNoResults'
import SearchNoYongsan from '@/components/search/SearchNoYongsan'

const HomePage = () => {
  const [keyword, setKeyword] = useState('')
  const [isToggle, setIsToggle] = useState(false)
  const [isNoResult, setNoResult] = useState(false)
  const [isNoYongsan, setNoYongsan] = useState(false)
  const navigate = useNavigate()

  const { markers, status } = usePlaceSearch(keyword)

  const goToMap = (keyword) => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!')
      return
    }
    if (status === 'success') {
      navigate('/map', { state: { markers: markers } })
    }
    if (status === 'noResults') {
      setNoResult(true)
      setKeyword('')
    }
    if (status === 'noYongsan') {
      setNoYongsan(true)
      setKeyword('')
    }
  }

  const goToMapFromList = (place) => {
    if (!place.address_name.includes('용산구')) {
      setNoYongsan(true)
      return
    }

    const marker = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      title: place.place_name,
    }

    navigate('/map', { state: { markers: [marker] } })
  }

  const goToMemory = () => {
    navigate('/memory')
  }

  const handleToggle = () => setIsToggle((prev) => !prev)

  const handleCloseInfo = () => {
    setNoResult(false)
    setNoYongsan(false)
  }

  return (
    <div className='flex flex-col justify-center items-center justify-items-center'>
      <img className='mt-[18.36vh]' src={Logo} alt='로고' />
      {isNoResult && <SearchNoResults onClose={handleCloseInfo} />}
      {isNoYongsan && <SearchNoYongsan onClose={handleCloseInfo} />}
      <div className='flex justify-between items-center border-2 border-primary rounded-[20px] p-2 mt-[3vh] h-[6.5vh] w-[85%] max-w-[500px]'>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='가게 이름, 위치를 검색해보세요!'
          className='ml-3 text-[4vw] outline-0'
          aria-label='검색창'
        ></input>
        <button
          onClick={() => goToMap(keyword)}
          className='flex justify-center items-center min-w-[40px] w-[9vw] min-h-[37px] h-[4vh] rounded-[12px] bg-primary'
        >
          <img src={Search} alt='검색 버튼'></img>
        </button>
      </div>
      <SearchResults keyword={keyword} goToMap={goToMapFromList} />
      <div className='mb-[120px] fixed bottom-0 flex flex-col items-center justify-center'>
        <img src={Arrow} onClick={handleToggle}></img>
        <p className='mt-[30px] text-[4vw] text-grey-200'>화살표를 눌러 기억을 꺼내보세요</p>
      </div>
      <div
        onClick={goToMemory}
        className={`
          fixed bottom-0 mb-[120px] flex flex-col items-center justify-center z-[30]
          h-[15vh] w-[85%] bg-[#FEF1DA] border border-primary rounded-[7px]
          transition-transform duration-500 ease-out
           ${isToggle ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'}
        `}
      >
        <h1 className='text-[5.1vw] font-bold text-grey-700'>감정으로 기억 꺼내기</h1>
        <p className='mt-[10px] text-[4.2vw] text-[#828282]'>분위기, 느낌으로 기억하시나요?</p>
      </div>
      <Footer selectedMenu={'home'}></Footer>
    </div>
  )
}

export default HomePage
