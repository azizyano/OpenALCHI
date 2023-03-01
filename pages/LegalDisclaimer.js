import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import constants from './../components/constants'
import NFT from './artifacts/LittleAlchemy.json'
import Header from './../components/Header'
import Market from './artifacts/NFTMarket.json'
import NFTCard1 from './../components/NFTCard1'
import NFTCard2 from './../components/NFTCard2'
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
  bannerImageContainer: `overflow-hidden flex justify-center items-center`,
  info: `flex justfy-between mx-auto text-[#e4e8eb] text-l drop-shadow-xl`,
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
  const [tokenName, setTokenName] = useState('')
  const [NftBanalce, setNftBanalce] = useState([])
  const [collection, setCollection] = useState({})
  const [items, setNfts] = useState([])
  const [treasury, setTreasury] = useState(0)
  const [nftaddress, setnftaddress] = useState('')
  const [nftmarketaddress, setnftmarketaddress] = useState('')
  
  useEffect(() => {
    searchnetwork()
  })
  useEffect(() => {
    if (!nftmarketaddress) return
    getAllListings()
    myElements()
    window.ethereum.on('accountsChanged', function (accounts) {
      getAllListings()
      myElements()
    })
  }, [nftmarketaddress])
  async function searchnetwork() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      if (network.chainId == 1088){
        setnftaddress(constants.Mgame);
        setnftmarketaddress(constants.Mmarket)
        setTokenName('Metis')
      } else if (network.chainId == 7700){
        setnftaddress(constants.Cgame);
        setnftmarketaddress(constants.Cmarket)
        setTokenName('Canto')
      } else if (network.chainId == 250){
        setnftaddress(constants.Fgame);
        setnftmarketaddress(constants.Fmarket)
        setTokenName('FTM')
      }
    } catch(e){
        console.log(e)
      }
    }
  async function getAllListings() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      await provider.getNetwork()
      const marketContract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      )
      const data = await marketContract.fetchItemsCreated()
      let treasury = 0
      const items = await Promise.all(
        data.map(async (i) => {
          var meta = ''
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
      console.log("read data")
      setTreasury(treasury.toFixed(2))
    } catch{
      console.log(Error)
    }

  }
  async function myElements() {
    try {
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
    } catch (e){
      console.log(e)
    }
  }

  return (
    <div className=" h-screen  bg-gray-700 ">
      <Header />
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Legal Disclaimer
                </h3>
        </div>
            <div class="p-6 space-y-6">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please read this disclaimer carefully before using https://www.littlealci.xyz/ and/or any of its sub-domains (hereinafter referred to as the "Website").
                    By using the Website, you confirm that you accept this legal disclaimer and agree to comply with it. If you do not agree, you must not use the Website.
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                    </p>
            </div>
            <div class="p-6 space-y-6">
                <h3 class="text-l font-semibold text-gray-900 dark:text-white">
                    Usage risks
                </h3>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The Website will not be responsible for any losses, damages, or claims arising from events falling within the scope of events like, but not limited to: mistakes made by the user (e.g., payments sent to wrong addresses),
                     software problems of the Website or any related software or service (e.g., malware or unsafe cryptographic libraries), technical failures (e.g., hardware wallets malfunction), security problems experienced by the user (e.g., unauthorized access to wallets), actions or inactions of third parties (e.g., bankruptcy of service providers, information security attacks on service providers, and fraud conducted by third parties).
                    </p>
            </div>
            <div class="p-6 space-y-6">
                <h3 class="text-l font-semibold text-gray-900 dark:text-white">
                Security
                </h3>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Security audits don't eliminate risks completely. The Website is not guaranteed to be secure or free from bugs or viruses.
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    As a commitment towards the safety of our users and partners, we want to be transparent about the changes and the status of the security audits of our smart contracts.
                    </p>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    OpenALCHI smart contract was adapted from Solidly, which codebase was open sourced. Since its release on Fantom network, no security incidents related to Solidly smart contracts were reported.
                    
                    </p>
            </div>
           
       </div> 
    </div>
  )
}
export default Profile