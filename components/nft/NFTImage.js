import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
}

const NFTImage = ({ selectedNft }) => {
  console.log(selectedNft)
  return (
    <div className=' bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <IoMdSnow />
          <div className={style.likesCounter}>
            Price : {selectedNft?.price.toString()/10**18}
          </div>
        </div>
      </div>
      <div>
        <img className='px-4 py-4' src={selectedNft?.image} />
      </div>
    </div>
  )
}

export default NFTImage