import { useState, useEffect } from 'react'
import Camera from '@/assets/Camera.svg'

const sameArray = (a = [], b = []) => a.length === b.length && a.every((v, i) => v === b[i])
const ImageUploader = ({ onChange, urllist, onFilesChange, onRemove }) => {
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (!urllist) return
    // urllist(객체 배열/문자열 혼합 가능)를 "문자열 URL 배열"로 정규화
    const urls = (Array.isArray(urllist) ? urllist : [])
      .map((u) => (typeof u === 'string' ? u : u?.image_url))
      .filter(Boolean)

    // 현재 images와 동일하면 set 생략 → 루프 차단
    if (!sameArray(images, urls)) setImages(urls)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urllist])

  useEffect(() => {
    onChange?.(images)
  }, [images, onChange])
  useEffect(() => {
    onFilesChange?.(files)
  }, [files, onFilesChange])

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files || [])
    if (images.length + uploaded.length > 10) {
      alert('최대 10개까지 업로드할 수 있어요!')
      return
    }
    const newUrls = uploaded.map((f) => URL.createObjectURL(f))
    setFiles((prev) => [...prev, uploaded])
    setImages((prev) => [...prev, ...newUrls])
    e.target.value = ''
  }

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // const getSrc = (image) => (typeof image === 'string' ? image : URL.createObjectURL(image))

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
              src={image}
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
