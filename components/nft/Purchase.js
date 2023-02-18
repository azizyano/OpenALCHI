import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import constants from '../../pages/constants'
import Market from '../../pages/artifacts/NFTMarket.json'



const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ selectedNft}) => {
  const [nftaddress, setnftaddress] = useState('')
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  const confirmClaim = (msg) => toast(msg)

  useEffect(() => {
    searchnetwork()
  })
  useEffect(() => {
    console.log(selectedNft)
  }, [])
  async function searchnetwork() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      console.log(network)
      if (network.chainId == 1088){
        setnftaddress(constants.Mgame);
        setnftmarketaddress(constants.Mmarket)
      } else if (network.chainId == 7700){
        setnftaddress(constants.Cgame);
        setnftmarketaddress(constants.Cmarket)
      } else if (network.chainId == 250){
        setnftaddress(constants.Fgame);
        setnftmarketaddress(constants.Fmarket)
      }
    } catch(e){
        console.log(e)
      }
      console.log('set address')
    }

  async function buyItem(nft) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      );
      const price = nft.price
      console.log("buy for :" + price, 'this toktn id; ' + nft.tokenId + '  ' + nft.item)
      try {
        const transaction = await marketContract.createMarketSale(nftaddress, nft.item, {
          value: price.toString()
        })
        await transaction.wait()
        confirmClaim('Purchase successful!')
      } catch (error) {
        console.log(error)
        confirmClaim(error.toString())
      }
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster 
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: 'text-sm ',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}  />
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