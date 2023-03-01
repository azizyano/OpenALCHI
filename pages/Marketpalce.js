import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import constants from './../components/constants'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Market from './artifacts/NFTMarket.json'
import NFT from './artifacts/LittleAlchemy.json'
import NFTCard from './../components/NFTCard'
import axios from 'axios'

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

const Marketpalce = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [tokenName, setTokenName] = useState('')
  const [nftaddress, setnftaddress] = useState()
  const { collectionId } = router.query
  const [items, setNfts] = useState([])
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  useEffect(() => {
    searchnetwork()
  },[nftmarketaddress])
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
        setnftaddress(constants.Mgame);
        setTokenName('Metis')
      } else if (network.chainId == 7700){
        setnftmarketaddress(constants.Cmarket)
        setnftaddress(constants.Cgame);
        setTokenName('Canto')
      } else if (network.chainId == 250){
        setnftmarketaddress(constants.Fmarket)
        setnftaddress(constants.Fgame);
        setTokenName('FTM')
      }
    } catch(e){
        console.log(e)
      }
    }

  async function getAllListings() {
    setLoading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GameContract = new ethers.Contract(
          nftaddress,
          NFT.abi,
          signer
        )
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      )
        const data = await marketContract.fetchMarketItems()
        console.log(data)
        const items = await Promise.all(
          data.map(async (i) => {
            try {
              const tokenURI = await GameContract.uri(i.tokenId)
              const tokendata = tokenURI.replace("{id}", i.tokenId)
              console.log(tokendata)
              const meta = await axios.get(tokendata)
              console.log(meta)
              const imageuri = imagelist[i.tokenId] ;
              let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
              let item = {
                price,
                itemId: i.itemId.toNumber(),
                tokenId: i.tokenId.toNumber(),
                name: title[i.tokenId],
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                image: imageuri,
                description: meta.data.description
              }
            return item;
              } catch (error) {
                console.log('meta error')
                meta= 'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
              }
          })
        )
        setNfts(items)
    } catch(e){
      console.log(e)
    }
    setLoading(false)
  }


  return (
    <div className="bg-gray-700 h-full">
      <Header />
      <div className='p-4 '>
        { loading ?
         (<div class=" flex items-center justify-center h-screen">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
          </div>
          ):
          (<div className={''}>
            <div className="flex flex-wrap  ">
              {items.map((nftItem, id) => (
                <NFTCard
                  key={id}
                  order={id}
                  nftItem={nftItem}
                  title={title[nftItem.tokenId]}
                  tokenName={tokenName}
                />
              ))}
            </div>
           </div>)}
      </div>
    </div>
  )
}
export default Marketpalce
