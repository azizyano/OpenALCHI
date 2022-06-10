import React, { useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import NFT from './artifacts/LittleAlchemy.json'
import Header from './../components/Header'
import Market from './artifacts/NFTMarket.json'
import NFTCard1 from './../components/NFTCard1'
import NFTCard2 from './../components/NFTCard2'
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
  info: `flex mx-10 text-[#e4e8eb] text-xl drop-shadow-xl`,
  title: `text-5xl font-bold mb-4`,
  statsContainer: `w-[44vw] px-4 py-4 mx-10 flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  listContainer: `mx-10 px-10 py-10 flex justify-between my-10 py-4 border border-[#151b22] rounded-xl mb-4`,
  ethLogo: `h-6 mr-2`,
  pValue: `w-full px-2 py-2 mx-2 text-[#68baba] text-center text-xl font-bold mt-2`,
  wrapper: `bg-[#303339]  my-10 mx-5 rounded-2xl overflow-hidden`,
}

const Profile = () => {
  const [account, setAccount] = useState()
  const [balanceArray, setBalanceArray] = useState([0])
  const [imgsource, setimgsource] = useState([])
  const [NftBanalce, setNftBanalce] = useState([])
  const [tokenBal, setTokenBal] = useState()
  const [collection, setCollection] = useState({})
  const [items, setNfts] = useState([])
  const [listings, setListings] = useState([]) 
  const [treasury, setTreasury] = useState(0)
  useEffect(() => {
    if (!collection) return
    getAllListings()
    myElements()
    console.log(imgsource)
  }, [collection])
  async function getAllListings() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    )
    const data = await marketContract.fetchItemsCreated()
    let treasury = 0
    const items = await Promise.all(
      data.map(async (i) => {
        const meta = ''
        try {
          meta = imagelist[i.tokenId]
        } catch (error) {
          console.log('meta error')
          meta =
            'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
        }

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let sold = 'Not yet'
        if (i.sold) {
          sold = 'Sold'
          treasury = treasury + parseFloat(price)
        }
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          tokenId: i.tokenId.toNumber(),
          name: title[i.tokenId],
          seller: i.seller,
          owner: i.owner,
          sold: sold,
          image: meta,
        }
        return item
      })
    )
    setNfts(items)
    setTreasury(treasury)
  }
  async function myElements() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
    const account = await signer.getAddress()
    setAccount(account)

    if (account) {
      const ownerAddress = [
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
        account,
      ]
      const ownerIds = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
      ]

      const balanceArray = await contract2.balanceOfBatch(
        ownerAddress,
        ownerIds
      )
      setBalanceArray(balanceArray)
      const itemBalance = await Promise.all(
        balanceArray.map(async (i, key) => {
          if (i.toString() !== '0') {
            let item = {
              tokenId: key,
              name: title[key],
              image: imagelist[key],
              balance: i.toString(),
            }
            return item
          } else return
        })
      )
      var filtered = itemBalance.filter((x) => x !== undefined)
      setNftBanalce(filtered)
      console.log(filtered)
    } else {
      console.log('You need to mint your first element')
    }
  }

  return (
    <div className=" overflow-hidden bg-gradient-to-l from-green-800 to-blue-800 ">
      <Header />
      <div className={style.bannerImageContainer}>
        <div className={style.statsContainer}>
          <div className={style.info}>Balance
            <div className={'px-10'}>
              {NftBanalce.length}
            </div> 
          </div>
          <div className={style.info}>Listed NFT
            <div className={'px-10'}>
              {items.length}
            </div>
          </div>
          <div className={style.info}>Total earned 
          <div className={'px-10'}>
            {treasury}  
          </div>
          <img
              src="https://seeklogo.com/images/P/polygon-matic-logo-86F4D6D773-seeklogo.com.png"
              alt="Metis"
              className={'h-6'}
            />
          </div>
          
        </div>
      </div>
      <div className='overflow-hidden '>

      <div className={style.info}>NFT balance</div>
      <div className={style.listContainer}>
      <div className="flex flex-wrap  ">
      
        {NftBanalce.map((nftItem, id) => (
          <div className={style.wrapper}>
            <NFTCard1
              key={id}
              order={nftItem.tokenId}
              nftItem={nftItem}
              name={nftItem.name}
              title={title[nftItem.tokenId]}
              listings={nftItem.sold}
              price={nftItem.price}
              balance={nftItem.balance}
            />
          </div>
        ))}
      </div>
      </div>
      <div className={style.info}>Listed NFT </div>
      <div className={style.listContainer}>
      
        <div className="flex flex-wrap ">
        
          {items.map((nftItem, id) => (
            <div className={style.wrapper}>
              <NFTCard2
                key={id}
                order={id}
                nftItem={nftItem}
                name={nftItem.name}
                title={title[nftItem.tokenId]}
                listings={nftItem.sold}
                price={nftItem.price}
              />
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </div>
  )
}
export default Profile
