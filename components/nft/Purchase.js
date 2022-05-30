import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import NFT from '../../pages/artifacts/LittleAlchemy.json'
import Market from '../../pages/artifacts/NFTMarket.json'

const nftaddress = '0xbE9a81fE76f98cdca8aDB5eb8beaD0c4dd55D5e7'

const nftmarketaddress = '0x7909eA2c2a0BaAE7b89976a80E807E5e0c33Ea1A'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ selectedNft}) => {
  console.log(selectedNft)
  const [enableButton, setEnableButton] = useState(false)

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  async function buyItem(nft) {
    console.log(nft)
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      );
      const price = nft.price
      console.log("buy for :" + price, 'this toktn id; ' + nft.tokenId + '  ' + nft.item)
      const transaction = await marketContract.createMarketSale(nftaddress, nft.item, {
        value: price.toString()
      })
      await transaction.wait()
      
    
    confirmPurchase()
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
        <>
          <div
            onClick={() => {buyItem(selectedNft)
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          
        </>
      
    </div>
  )
}

export default MakeOffer