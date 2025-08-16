import React from 'react'

const SearchResults = ({ results, goToMap }) => {
  return (
    <div
      className={`absolute top-[33vh] w-[85%] max-w-[500px] p-3 pt-2 pb-1 border-2 border-primary rounded-[20px] bg-white shadow-md z-20 overflow-y-auto max-h-[55vh] ${results.length === 0 ? 'hidden' : ''} scrollbar-hide`}
    >
      <ul>
        {results.map((place) => (
          <li
            key={place.id}
            className='cursor-pointer border-b-2 border-primary last:border-0 p-2 hover:bg-gray-100'
            onClick={() => {
              goToMap(place.place_name)
            }}
          >
            <p className='font-medium text-[4vw]'>{place.place_name}</p>
            <p className='text-[3.5vw] text-gray-500'>{place.address_name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResults
