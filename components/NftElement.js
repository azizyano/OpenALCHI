import React from 'react'

const NftElement = ({item}) => {
  return (
        <img
          width='60'
          className='p-2'
          src={item.image}
          alt=""
          />
  )
}

export default NftElement