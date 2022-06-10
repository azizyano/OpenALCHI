import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import NFT from '../../pages/artifacts/LittleAlchemy.json'
import Market from '../../pages/artifacts/NFTMarket.json'

const nftaddress = '0xd6547D88b36DD4A8A952f6439eAdf73676062D19'
const nftmarketaddress = '0x4F38cF64C66cDbaCc0be4646b21Aa557C29538AF'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
  inputBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  Input: `h-[2.6rem] w-full border-0 bg-transparent outline-0 px-4 py-4 mx-4 text-lg text-[#e6e8eb] placeholder:text-[#8a939b]`,

}

const MakeOffer = ({ selectedNft}) => {
  console.log(selectedNft)
  const [enableButton, setEnableButton] = useState(false)
  const [amount, setAmount] = useState('0')
  const [allowMarket, setApprovedMarket] = useState()
  const confirmListing = (toastHandler = toast) =>
    toastHandler.success(`listed successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  const confirmApproved = (toastHandler = toast) =>
    toastHandler.success(`Contract Approved!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  async function Approved() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const account = await signer.getAddress()
      const contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      const value = await contract.isApprovedForAll(account, nftmarketaddress)
      const amount = value.toString()
      console.log(amount)
      if (amount === 'false') {
        setApprovedMarket(false)
      } else {
        setApprovedMarket(true)
      }
  }
  useEffect(() => {
    if (!selectedNft) return
    Approved()
  }, [selectedNft])

async function ApproveMarket() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const address = nftmarketaddress.toString()
  const contract = new ethers.Contract(nftaddress, NFT.abi, signer)
  let transaction = await contract.setApprovalForAll(address, true)
  await transaction.wait()
  setApprovedMarket(true)
  confirmApproved()
}

  async function ListItem(nft) {
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const price = ethers.utils.parseUnits(amount, 'ether')
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      );
      let listingPrice = await marketContract.getListingPrice()
      listingPrice = listingPrice.toString()
      console.log("Sell for :" + price, 'this toktn id; ' + nft.tokenId )
      const transaction = await marketContract.createMarketItem(nftaddress, nft.tokenId, price, { value: listingPrice })
      await transaction.wait()
    confirmListing()
  }
  const changeAmount = ({ target }) => {
    setAmount(target.value)
  }
  return (
    <div className=" flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
        <>
        
          {allowMarket ? 
          <>
          <div className={style.inputBar}>
            <input className={style.Input} 
            placeholder="  Listing price " 
            type="number"
            onChange={changeAmount}></input>
        </div>
        <div
            onClick={() => {ListItem(selectedNft)
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>List Now</div>
          </div>
          </>
          
          : 
          <div
            onClick={() => {ApproveMarket()
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Approve</div>
          </div>
          }
        </>
      
    </div>
  )
}

export default MakeOffer