import React, { useState, useEffect, useRef } from 'react'
import DropdownSign from '@/assets/DropdownSign.svg'
import { useOutsideClick } from '@/hooks/useOutsideClick.jsx'

export const emotionList = [
  { emotion_id: 1, name: '정겨움' },
  { emotion_id: 2, name: '편안함' },
  { emotion_id: 3, name: '조용함' },
  { emotion_id: 4, name: '활기참' },
  { emotion_id: 5, name: '소박함' },
  { emotion_id: 6, name: '세심함' },
]

export const locationList = [
  { location_id: 1, name: '이태원' },
  { location_id: 2, name: '한남동' },
  { location_id: 3, name: '후암동' },
  { location_id: 4, name: '효창동' },
  { location_id: 5, name: '용문동' },
  { location_id: 6, name: '청파동' },
  { location_id: 7, name: '해방촌' },
]

export const boardList = [
  { board_id: 1, name: '제보' },
  { board_id: 2, name: '홍보' },
  { board_id: 3, name: '추억기록' },
]

const Dropdown = ({ label, onSelect, value }) => {
  const [open, setOpen] = useState(false)

  const [displayLabel, setDisplayLabel] = useState(label)
  const [filtered, setFiltered] = useState(false)
  const [selected, setSelected] = useState('전체')
  const [filteredId, setFilteredId] = useState(null)

  const rootRef = useRef(null)
  useOutsideClick(rootRef, () => setOpen(false), open)

  let options = []
  if (label === '감정') {
    options = emotionList
  } else if (label === '동네') {
    options = locationList
  } else if (label === '분류') {
    options = boardList
  }

  // ✅ ID 헬퍼
  const getId = (opt) => opt?.emotion_id ?? opt?.location_id ?? opt?.board_id ?? null

  // ✅ value(부모 상태) 기준으로 현재 선택된 항목/ID
  const selectedId = value ?? null
  const selectedOpt = options.find((o) => getId(o) === selectedId) || null

  // ✅ value 변화 시 라벨/색상 동기화
  useEffect(() => {
    if (selectedOpt) {
      setDisplayLabel(selectedOpt.name)
      setFiltered(true)
      setSelected(selectedOpt)
    } else {
      setDisplayLabel(label)
      setFiltered(false)
      setSelected('전체')
    }
  }, [selectedId, selectedOpt, label])

  const handleSelect = (optOrNull) => {
    const id = getId(optOrNull)
    // 부모에 통지 (핵심)
    onSelect?.(id)

    // 내부 표시 상태도 맞춰줌 (리액션 빨리 보이게)
    if (optOrNull) {
      setDisplayLabel(optOrNull.name)
      setFiltered(true)
      setSelected(optOrNull)
    } else {
      setDisplayLabel(label)
      setFiltered(false)
      setSelected('전체')
    }
    setOpen(false)
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        type='button'
        onClick={() => {
          setOpen((o) => !o)
        }}
        className={`flex items-center justify-center w-[17.8vw] max-w-[6rem] h-[1.5rem] bg-grey-100 cursor-pointer rounded-[5px] font-[SemiBold] text-[12px] text-grey-700 ${filtered ? 'bg-primary-300' : 'bg-grey-100'} hover:bg-primary-300`}
      >
        {displayLabel}
        <img className='w-[20px]' src={DropdownSign} />
      </button>

      {open && (
        <div className='flex flex-col bg-grey-100 rounded-[10px] w-[17.8vw] max-w-[6rem] mt-[3px] font-[SemiBold] text-[0.625rem] text-grey-700 overflow-hidden absolute top-full left-0 z-40'>
          <button
            type='button'
            className={`hover:bg-primary-300 p-[5px] active:bg-primary-300 ${
              selected === '전체' ? 'bg-primary-300' : 'bg-grey-100'
            }`}
            onClick={() => {
              setDisplayLabel(label)
              setFiltered(false)
              setOpen(false)
              setSelected('전체')
              onSelect(null)
            }}
          >
            전체
          </button>
          {options.map((opt) => {
            const id = opt.emotion_id ?? opt.location_id ?? opt.board_id
            return (
              <button
                type='button'
                className={`hover:bg-primary-300 p-[5px] active:bg-primary-300 ${
                  selected === opt ? 'bg-primary-300' : 'bg-grey-100'
                }`}
                key={id}
                onClick={() => {
                  handleSelect(opt)
                }}
              >
                {opt.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
