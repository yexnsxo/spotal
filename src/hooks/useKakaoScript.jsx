import { useState, useEffect } from 'react'

const useKakaoScript = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkKakao = () => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        setIsReady(true)
        return true
      }
      return false
    }

    if (checkKakao()) return

    const interval = setInterval(() => {
      if (checkKakao()) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return isReady
}

export default useKakaoScript
