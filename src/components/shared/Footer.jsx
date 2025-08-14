import React from 'react'
import My from '@/assets/My.svg?react'
import Home from '@/assets/Home.svg?react'
import Community from '@/assets/Community.svg?react'

const Footer = ({ menu }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 bg-white flex items-center justify-between w-[100vw] pr-[7.82vw] pl-[7.82vw] h-[7.464vh]'>
      <Home className={menu === 'home' ? 'text-primary' : 'text-grey-200'} />
      <Community className={menu === 'community' ? 'text-primary' : 'text-grey-200'} />
      <My className={menu === 'my' ? 'text-primary' : 'text-grey-200'} />
    </div>
  )
}

export default Footer
