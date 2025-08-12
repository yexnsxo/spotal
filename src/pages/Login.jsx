import React from 'react'
import Logo from '../assets/Logo.svg'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'
import { Link } from 'react-router-dom'

const Login = () => {
  const postLoginRequest = () => {}

  return (
    <div className='flex flex-col justify-center items-center justify-items-center'>
      <img className='mt-[18.36vh]' src={Logo} />
      <form className='flex flex-col gap-[1.184vh] mt-[5.094vh]'>
        <AuthBox label={'이메일'} />
        <AuthBox label={'비밀번호'} />
        <div className='mt-[4.74vh] flex flex-col justify-center items-center justify-items-center'>
          <AuthBtn text={'로그인하기'} onClick={postLoginRequest} />
          <p className='font-[Medium] font-[16px] text-primary mt-[1.184vh]'>
            아직 계정이 없으신가요?
            <Link to='/signup' className='underline ml-[5px]'>
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
