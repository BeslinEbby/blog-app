import React from 'react'

const NoData = ({content}) => {
  return (
    <div className='w-full h-[80vh] bg-transparent flex justify-center items-center'>
        <p className='text-lg font-semibold capitalize'>{content}</p>
    </div>
  )
}

export default NoData