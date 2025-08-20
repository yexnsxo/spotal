import { useState, useEffect, useRef } from 'react'
import TagBtn from './TagBtn.jsx'
import { useOutsideClick } from '@/hooks/useOutsideClick.jsx'
import ChevronUp from '@/assets/ChevronUp.svg'
import ChevronDown from '@/assets/ChevronDown.svg'

const Dropdown2 = ({ placeholder, options = [], onChange, name }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])

  const rootRef = useRef(null)
  useOutsideClick(rootRef, () => setOpen(false), open)

  const isEmotion = name === 'emotion'
  const id = isEmotion ? 'emotion_id' : 'location_id'

  const handleClick = (opt, isSelected) => {
    if (isEmotion) {
      if (isSelected) {
        setSelected(selected.filter((s) => s[id] !== opt[id]))
      } else {
        setSelected((prev) => {
          if (prev.length >= 3) return prev
          const next = [...prev, opt]
          if (next.length === 3) setOpen(false)
          return next
        })
      }
    } else {
      if (!isSelected) {
        setSelected([opt])
        setOpen(false)
      } else setSelected([])
    }
  }

  useEffect(() => {
    const ids = selected.map((s) => s[id])
    onChange?.({ name, ids })
  }, [selected, name, onChange])

  const displayText = selected.map((s) => s.name).join(', ')

  return (
    <div ref={rootRef} className='relative'>
      <div
        className={`flex w-[71.794vw] h-[5.213vh] bg-[#ffffff] rounded-[9px] border-[0.9px] py-[0.5rem] px-[0.4rem] cursor-text ${open ? 'border-primary' : 'border-gray-200'}`}
        onFocus={() => setOpen(true)}
      >
        <input
          type='text'
          className='w-full focus:outline-none'
          name={name}
          value={displayText}
          placeholder={placeholder}
          readOnly
        />
        <img
          className='w-[12px] mr-[4px]'
          src={open ? ChevronUp : ChevronDown}
          alt=''
          onClick={() => setOpen((o) => !o)}
        />
      </div>
      {open && (
        <div className='absolute top-full left-0 mt-[4px] z-40 grid grid-cols-3 gap-x-[3.59vw] gap-y-[2.843vh] rounded-[9px] px-[1.794vw] py-[2.37vh] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.2)]'>
          {options.map((opt) => {
            const isSelected = selected.some((s) => s[id] === opt[id])
            return (
              <TagBtn
                key={opt[id]}
                label={opt.name}
                isSelected={isSelected}
                onClick={() => handleClick(opt, isSelected)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown2
