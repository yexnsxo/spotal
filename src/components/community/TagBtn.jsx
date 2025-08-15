import { useState } from 'react'

const TagBtn = ({ label }) => {
  const [isSelected, setIsSelected] = useState(true)
  return (
    <div>
      <button
        value={label}
        className={`rounded-[5px] py-[2px] px-[6.5px] text-[0.75rem] ${isSelected ? 'bg-primary-200' : 'bg-grey-100'}`}
        onClick={() => setIsSelected((i) => !i)}
      >
        {label}
      </button>
    </div>
  )
}

export default TagBtn
