import React from 'react'

const SearchBar = () => {
  return (
    <div className='p-2 flex flex-col sm:flex-row gap-2 justify-between shadow-xl bg-gray-50'>
        <div className='flex gap-2 items-center '>
            <h1 className='font-medium'>Search:</h1>
            <input type="text"
            placeholder='Search...'
            className='p-1 rounded-lg border border-black'
            />
        </div>
        <div className='flex gap-2 items-center'>
            <h1 className='font-medium'>
                Sort By:
            </h1>
            <select className='p-1 rounded-lg border border-black'>
                <option value="createdAt">Created At</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
            </select>
        </div>
    </div>
  )
}

export default SearchBar