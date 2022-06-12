import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import NFT from '../artifacts/LittleAlchemy.json'
import Header from '../../components/Header'
import Market from '../artifacts/NFTMarket.json'
import NFTCard from '../../components/NFTCard'
const nftaddress = '0xd6547D88b36DD4A8A952f6439eAdf73676062D19'
const nftmarketaddress = '0x4F38cF64C66cDbaCc0be4646b21Aa557C29538AF'
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
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  listContainer: ` flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-[#8a939b] text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const { collectionId } = router.query
  const [collection, setCollection] = useState({})
  const [items, setNfts] = useState([])
  const [listings, setListings] = useState([])
  useEffect(() => {
    if (!collectionId) return
    getAllListings()
  }, [collectionId])
  async function getAllListings() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    )
      const data = await marketContract.fetchMarketItems()
      console.log(data)
      const items = await Promise.all(
        data.map(async (i) => {
          const meta = ''
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
        
  }


  return (
    <div className=" overflow-hidden bg-gradient-to-l from-green-800 to-blue-800 ">
      <Header />
      <div className={style.bannerImageContainer}>
        <div className={style.statValue}>
          Little Alchemy Marketplace
        </div>
      </div>
      <div className={'h-screen'}>
      <div className="flex flex-wrap  bg-gradient-to-l from-green-600 to-blue-600 ">
        {items.map((nftItem, id) => (
          <NFTCard
            key={id}
            order={id}
            nftItem={nftItem}
            name={nftItem.name}
            title={title[nftItem.tokenId]}
            listings={nftItem.sold}
            price={nftItem.price}
          />
        ))}
      </div>
      </div>
      
    </div>
  )
}
export default Collection
