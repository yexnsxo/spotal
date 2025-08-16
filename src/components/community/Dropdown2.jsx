import React, { useState, useEffect, useRef } from 'react'
import TagBtn from './TagBtn.jsx'

const Dropdown2 = ({ placeholder, options = [], value, onChange, className = '' }) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown, { capture: false })
    return () => document.removeEventListener('mousedown', onDown, { capture: false })
  }, [open])

  return (
    <div>
      <div ref={rootRef} className={`relative ${className}`}>
        <input
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          className='w-[71.794vw] h-[5.213vh] bg-[#ffffff] focus:outline-none rounded-[9px]
                  border-[0.9px] border-grey-200 py-[0.5rem] px-[0.4rem] cursor-text'
          readOnly
        />
        {open && (
          <div
            className='absolute top-full left-0 mt-[4px] z-40 py-[2.37vh] px-[1.794vw] gap-y-[2.843vh] gap-x-[3.59vw] grid grid-cols-3 gap-[] rounded-[9px] bg-white
                    shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
          >
            {options.map((opt) => (
              <TagBtn key={opt} label={`${opt}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropdown2
