import { useState, useEffect } from 'react'
import Camera from '@/assets/Camera.svg'

const sameArray = (a = [], b = []) => a.length === b.length && a.every((v, i) => v === b[i])
const ImageUploader = ({ onChange, urllist }) => {
  const [images, setImages] = useState(Array.isArray(urllist) ? urllist : [])

  useEffect(() => {
    const next = Array.isArray(urllist) ? urllist : []
    if (!sameArray(images, next)) setImages(next)
  }, [urllist])

  useEffect(() => {
    onChange?.(images)
  }, [images, onChange])

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files || [])
    if (images.length + uploaded.length > 10) {
      alert('최대 10개까지 업로드할 수 있어요!')
      return
    }
    setImages((prev) => [...prev, ...uploaded])
    e.target.value = ''
  }

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const getSrc = (image) => (typeof image === 'string' ? image : URL.createObjectURL(image))

  return (
    <div className='relative'>
      <div className='flex gap-[7px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <label className='flex shrink-0 snap-start flex-col justify-center items-center w-[14.87vw] h-[14.87vw] bg-white border-[0.9px] border-grey-200 rounded-[9px]'>
          <span>
            <img src={Camera} />
          </span>
          <span className='text-grey-700 text-[11px] font-[Medium] mt-[2px]'>
            {images.length}/10
          </span>
          <input type='file' accept='image/*' multiple className='hidden' onChange={handleUpload} />
        </label>
        {images.map((image, i) => (
          <div
            key={i}
            className='relative flex flex-col shrink-0 snap-start justify-center items-center w-[14.87vw] h-[14.87vw] bg-white border-[0.9px] border-grey-200 rounded-[9px] overflow-hidden'
          >
            <img
              src={getSrc(image)}
              alt={`upload-${i}`}
              className='w-full h-full object-cover'
              loading='lazy'
            />
            <button
              type='button'
              onClick={() => handleDelete(i)}
              className='absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-black/60 text-white text-xs'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader
