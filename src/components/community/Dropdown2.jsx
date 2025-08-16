import React, { useState, useEffect, useRef } from 'react'
import TagBtn from './TagBtn.jsx'

const Dropdown2 = ({ placeholder, options = [], value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown, { capture: false })
    return () => document.removeEventListener('mousedown', onDown, { capture: false })
  }, [open])

  const handleClick = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option))
    } else {
      if (selected.length >= 3) return
      setSelected([...selected, option])
    }
  }

  useEffect(() => {
    onChange?.(selected.join(', '))
  }, [selected, onChange])

  return (
    <div ref={rootRef} className='relative'>
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
        <div className='absolute top-full left-0 mt-[4px] z-40 grid grid-cols-3 gap-x-[3.59vw] gap-y-[2.843vh] rounded-[9px] px-[1.794vw] py-[2.37vh] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.2)]'>
          {options.map((opt) => {
            const isSelected = selected.includes(opt)
            return (
              <TagBtn
                key={opt}
                label={opt}
                isSelected={isSelected}
                onClick={() => handleClick(opt)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown2
