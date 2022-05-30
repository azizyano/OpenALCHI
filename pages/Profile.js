import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { IoMdWallet } from 'react-icons/io'
import axios from 'axios'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFT from './artifacts/LittleAlchemy.json'
import Header from './../components/Header'
import Market from './artifacts/NFTMarket.json'
import NFTCard from './../components/NFTCard'
import NFTCard1 from './../components/NFTCard1'
import NFTCard2 from './../components/NFTCard2'
const nftaddress = '0xbE9a81fE76f98cdca8aDB5eb8beaD0c4dd55D5e7'
const nftmarketaddress = '0x7909eA2c2a0BaAE7b89976a80E807E5e0c33Ea1A'
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
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
  wrapper: `bg-[#303339]  my-10 mx-5 rounded-2xl overflow-hidden`,
  button: ` flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
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
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
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
  const nullBalance = (toastHandler = toast) =>
    toastHandler.success(`You dont have any NFT Elemnts!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  return (
    <div className=" overflow-hidden bg-gradient-to-l from-green-800 to-blue-800 ">
      <Header />
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              'https://littlealchi.xyz/static/media/background1-min.839efe9f.png'
            }
            alt="profile image"
          />
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            <span className="text-[#2081e2]">Profile</span>
          </div>
        </div>
        
      <div className={style.midRow}>
        <div className={style.createdBy}>
          <span className="text-[#2081e2]">ALCHIMetis Elements</span>
        </div>
      </div>
      <div className={style.midRow}>
        <div className={style.statsContainer}>
          <div className={style.collectionStat}>
            <div className={style.statValue}>{NftBanalce.length}</div>
            <div className={style.statName}>items</div>
          </div>
          <div className={style.collectionStat}>
            <div className={style.statName}>NFT Balance</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap ">
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
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{items.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : ''}
              </div>
              <div className={style.statName}>My Listed NFT </div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {treasury}
              </div>
              <div className={style.statName}>Marketplace incomes</div>
            </div>
             
          </div>
        </div>
      </div>
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
  )
}
export default Profile
