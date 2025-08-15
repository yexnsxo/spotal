import React, { useState, useMemo } from 'react'
import Logo from '../assets/Logo.svg'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 버튼 활성화 여부 확인 (폼 내용 전부 작성 && 중복 확인 전부 통과 시 true 리턴)
  const canSubmit = useMemo(() => {
    const filled = email.trim() !== '' && password.trim() !== ''
    return filled
  }, [email, password])

  const postLoginRequest = () => {
    // axios
    //   .post(`${baseURL}/entries/`, {
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     alert('로그인에 성공하셨습니다.')
    //     navigate('/')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     alert('로그인에 실패하셨습니다.')
    //   })
  }

  return (
    <div className='flex flex-col justify-center items-center justify-items-center bg-white'>
      <img className='mt-[18.36vh]' src={Logo} />
      <form className='flex flex-col gap-[1.184vh] mt-[5.094vh]'>
        <AuthBox
          label={'이메일'}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <AuthBox
          label={'비밀번호'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <div className='mt-[4.74vh] flex flex-col justify-center items-center justify-items-center'>
          <AuthBtn text={'로그인하기'} onClick={postLoginRequest} disabled={!canSubmit} />
          <p className='font-[Medium] font-[16px] text-primary mt-[1.184vh]'>
            아직 계정이 없으신가요?
            <Link to='/Signup' className='underline ml-[5px]'>
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
