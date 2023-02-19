import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import constants from '../../components/constants'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Market from '../artifacts/NFTMarket.json'
import NFTCard from '../../components/NFTCard'
const imagelist = [
  '../imgs/water.png',
  '../imgs/air.png',
  '../imgs/fire.png',
  '../imgs/earth.png',
  '../imgs/steam.png',
  '../imgs/energy.png',
  '../imgs/lava.png',
  '../imgs/rain.png',
  '../imgs/mud.png',
  '../imgs/plant.png',
  '../imgs/rock.png',
  '../imgs/sand.png',
  '../imgs/metal.png',
  '../imgs/glass.png',
  '../imgs/swamp.png',
  '../imgs/eyeglasse.png',
  '../imgs/electricity.png',
  '../imgs/life.png',
  '../imgs/human.png',
  '../imgs/nerd.png',
  '../imgs/computer.png',
  '../imgs/internet.png',
  '../imgs/blockchain.png',
  '../imgs/Bitcoin.png',
]
const title = [
  'Water',
  'Air',
  'Fire',
  'Earth',
  'Steam',
  'Energy',
  'Lava',
  'Rain',
  'Mud',
  'Plant',
  'Rock',
  'Sand',
  'Metal',
  'Glass',
  'Swamp',
  'Eyeglasse',
  'Electricity',
  'Life',
  'Human',
  'Nerd',
  'Computer',
  'Internet',
  'Blockchain',
  'Bitcoin',
]

const style = {
  title: `text-5xl font-bold mb-4`,
}

const Collection = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tokenName, setTokenName] = useState('')
  const { collectionId } = router.query
  const [items, setNfts] = useState([])
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  useEffect(() => {
    if(!collectionId) return
    searchnetwork()
  },[!collectionId])
  useEffect(() => {
    if (nftmarketaddress == '') return
    getAllListings()
    window.ethereum.on('accountsChanged', function (accounts) {
      getAllListings()
    })
  }, [nftmarketaddress])
  async function searchnetwork() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      console.log(network.chainId)
      if (network.chainId == 1088){
        setnftmarketaddress(constants.Mmarket)
        setTokenName('Metis')
      } else if (network.chainId == 7700){
        setnftmarketaddress(constants.Cmarket)
        setTokenName('Canto')
      } else if (network.chainId == 250){
        setnftmarketaddress(constants.Fmarket)
        setTokenName('FTM')
      }
    } catch(e){
        console.log(e)
      }
    }

  async function getAllListings() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
        console.log(nftmarketaddress)
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      )
        const data = await marketContract.fetchMarketItems()
        console.log(data)
        const items = await Promise.all(
          data.map(async (i) => {
            var meta = ''
            try {
               meta = imagelist[i.tokenId] ;
            } catch (error) {
              console.log('meta error')
              meta= 'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
            }
            
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
              price,
              itemId: i.itemId.toNumber(),
              tokenId: i.tokenId.toNumber(),
              name: title[i.tokenId],
              seller: i.seller,
              owner: i.owner,
              sold: i.sold,
              image: meta,
            }
            return item;
          })
        )
        setNfts(items)
    } catch(e){
      console.log(e)
    }
    setLoading(false)
  }


  return (
    <div className=" bg-sky-700 h-full">
      <Header />
      <div className='m-auto p-4'>
        { loading ?
         (<div className='flex justify-center items-center'>
         <div role="status ">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div></div>
          ):
          (<div className={''}>
            <div className="flex flex-wrap  ">
              {items.map((nftItem, id) => (
                <NFTCard
                  key={id}
                  order={id}
                  nftItem={nftItem}
                  name={nftItem.name}
                  title={title[nftItem.tokenId]}
                  listings={nftItem.sold}
                  price={nftItem.price}
                  tokenName={tokenName}
                />
              ))}
            </div>
           </div>)}
      </div>
   

      <Footer/>
    </div>
  )
}
export default Collection
