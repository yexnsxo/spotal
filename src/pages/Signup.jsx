import React from 'react'
import Logo from '../assets/Logo.svg'
import SignupImg from '../assets/Signup.svg'
import AuthBox2 from '@/components/auth/AuthBox2.jsx'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'

const Signup = () => {
  const postSignupRequest = () => {
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

  return (
    <div className='flex flex-col justify-center items-center justify-items-center'>
      <img className='mt-[11.492vh]' src={Logo} alt='Logo' />
      <img className='mt-[3.08vh]' src={SignupImg} alt='SignupImg' />
      <form>
        <div className='flex flex-col gap-[0.83vh] mt-0'>
          <AuthBox2 label={'이메일'} />
          <AuthBox label={'비밀번호'} />
          <AuthBox2 label={'닉네임'} />
        </div>
        <div className='mt-[4.74vh]'>
          <AuthBtn bg={'bg-primary-200'} text={'회원가입 완료하기'} onClick={postSignupRequest} />
        </div>
      </form>
    </div>
  )
}

export default Signup
