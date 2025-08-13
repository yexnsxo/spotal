import React, { useState, useEffect } from 'react'
import Logo from '../assets/Logo.svg'
import SignupImg from '../assets/Signup.svg'
import AuthBox2 from '@/components/auth/AuthBox2.jsx'
import AuthBox from '@/components/auth/AuthBox.jsx'
import AuthBtn from '@/components/auth/AuthBtn.jsx'

const Signup = () => {
  const [emailPressed, setEmailPressed] = useState(false)
  const [nicknamPressed, setNicknamePressed] = useState(false)

  const emailBtnBg = emailPressed
    ? 'bg-[#FFF8EC] text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'
  const nicknameBtnBg = nicknamPressed
    ? 'bg-[#FFF8EC] text-primary border border-[1px] border-primary'
    : 'bg-grey-100 text-grey-700'

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

  // const handleClick = () => {
  //   postSignupRequest()
  //   setPressed(true)
  // }

  return (
    <div className='flex flex-col justify-center items-center justify-items-center'>
      <img className='mt-[11.492vh]' src={Logo} alt='Logo' />
      <img className='mt-[3.08vh]' src={SignupImg} alt='SignupImg' />
      <form>
        <div className='flex flex-col gap-[0.83vh] mt-0'>
          <AuthBox2 label={'이메일'} bg={emailBtnBg} onClick={() => setEmailPressed((p) => !p)} />
          <AuthBox label={'비밀번호'} />
          <AuthBox2
            label={'닉네임'}
            bg={nicknameBtnBg}
            onClick={() => setNicknamePressed((p) => !p)}
          />
        </div>
        <div className='mt-[4.74vh]'>
          <AuthBtn bg={'bg-primary-200'} text={'회원가입 완료하기'} onClick={postSignupRequest} />
        </div>
      </form>
    </div>
  )
}

export default Signup
