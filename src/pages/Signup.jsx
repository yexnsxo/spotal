import React, { useState, useEffect, useMemo } from 'react'
import Logo from '../assets/Logo.svg'
import SignupImg from '../assets/Signup.svg'
import AuthBox2 from '@/components/auth/AuthBox2.jsx'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'

const Signup = () => {
  // 입력값
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  // 중복확인 통과여부 -> 현재 로직 없이 버튼 클릭 시 true 바뀌도록 설정
  const [emailChecked, setEmailChecked] = useState(false)
  const [nicknameChecked, setNicknameChecked] = useState(false)

  // 중복 확인 버튼 클릭 시 버튼 색 변경
  const emailBtnBg = emailChecked
    ? 'bg-[#FFF8EC] text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'
  const nicknameBtnBg = nicknameChecked
    ? 'bg-[#FFF8EC] text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'

  // 버튼 활성화 여부 확인 (폼 내용 전부 작성 && 중복 확인 전부 통과 시 true 리턴)
  const canSubmit = useMemo(() => {
    const filled = email.trim() !== '' && password.trim() !== '' && nickname.trim() !== ''
    return filled && emailChecked && nicknameChecked
  }, [email, password, nickname, emailChecked, nicknameChecked])

  // 회원가입 폼 제출 로직
  const postSignupRequest = () => {
    if (!canSubmit) return // 버튼이 활성화되지 않았을 때 제출하지 않음
    // axios
    //   .post(`${baseURL}/entries/`, {
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     alert('회원가입에 성공하셨습니다.')
    //     navigate('/')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     alert('회원가입에 실패하셨습니다.')
    //   })
  }

  // 추후 백엔드 api와 연결 예정
  const handleEmailChecked = () => {
    setEmailChecked(true)
  }
  const handleNicknamChecked = () => {
    setNicknameChecked(true)
  }

  return (
    <div className='flex flex-col justify-center items-center justify-items-center'>
      <img className='mt-[11.492vh]' src={Logo} alt='Logo' />
      <img className='mt-[3.08vh]' src={SignupImg} alt='SignupImg' />
      <form>
        <div className='flex flex-col gap-[0.83vh] mt-0'>
          <AuthBox2
            label={'이메일'}
            bg={emailBtnBg}
            onClick={handleEmailChecked}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailChecked(false)
            }}
          />
          <AuthBox
            label={'비밀번호'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthBox2
            label={'닉네임'}
            bg={nicknameBtnBg}
            onClick={handleNicknamChecked}
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setNicknameChecked(false)
            }}
          />
        </div>
        <div className='mt-[4.74vh]'>
          <AuthBtn text={'회원가입 완료하기'} disabled={!canSubmit} onClick={postSignupRequest} />
        </div>
      </form>
    </div>
  )
}

export default Signup
