import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Select from 'react-select';
import constants from './constants'
import NFT from './artifacts/LittleAlchemy.json'
import Token from './artifacts/Token.json'
import Header from './../components/Header'
import Footer from './../components/Footer'
import NftElement from './../components/NftElement'
import toast, { Toaster } from 'react-hot-toast'
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
const options = [
  { value: 'mintStandard', label: 'Standard Elements' },
  { value: 'mintPlant', label: 'RainEarth' },
  { value: 'mintSand', label: 'AirRock' },
  { value: 'mintRock', label: 'AirLava' },
  { value: 'mintMud', label: 'WaterEarth' },
  { value: 'mintRain', label: 'WaterAir' },
  { value: 'mintSteam', label: 'WaterFire' },
  { value: 'mintEnergy', label: 'FireAir' },
  { value: 'mintLava', label: 'FireEarth' },
  { value: 'mintMetal', label: 'FireRock' },
  { value: 'mintGlass', label: 'SandFire' },
  { value: 'mintSwamp', label: 'PantMud' },
  { value: 'mintEyeglasse', label: 'GlassGlass' },
  { value: 'mintElectricity', label: 'EnergyMetal' },
  { value: 'mintLife', label: 'EnergyMud' },
  { value: 'mintHuman', label: 'LifeEarth' },
  { value: 'mintNerd', label: 'EyeglasseHuman' },
  { value: 'mintComputer', label: 'ElectricityNerd' },
  { value: 'mintInternet', label: 'ComputerComputer' },
  { value: 'mintBlockchain', label: 'ComputerInternet' },
  { value: 'mintBitcoin', label: 'NerdBlockchain' }
]
const elementsOptions = [
  { value: 0, label: 'Water' },
  { value: 1, label: 'Air' },
  { value: 2, label: 'Fire' },
  { value: 3, label: 'Earth' },
  { value: 4, label: 'Steam' },
  { value: 5, label: 'Energy' },
  { value: 6, label: 'Lava' },
  { value: 7, label: 'Rain' },
  { value: 8, label: 'Mud' },
  { value: 9, label: 'Plant' },
  { value: 10, label: 'Rock' },
  { value: 11, label: 'Sand' },
  { value: 12, label: 'Metal' },
  { value: 13, label: 'Glass' },
  { value: 14, label: 'Swamp' },
  { value: 15, label: 'Eyeglasse' },
  { value: 16, label: 'Electricity' },
  { value: 17, label: 'Life' },
  { value: 18, label: 'Human' },
  { value: 19, label: 'Nerd' },
  { value: 20, label: 'Computer' },
  { value: 21, label: 'Internet' },
  { value: 22, label: 'Blockchain' },
  { value: 23, label: 'Bitcoin' },
]
const style = {
  container: ` py-4 px-4 rounded-xl `,
  wrapper: `justify-between items-stretch grid gap-6 mb-6 md:grid-cols-2 `,
  titleContainer: `p-4 text-xl drop-shadow-xl text-sky-400 border border-sky-500 rounded-xl mb-4`,
  info: `flex justify-between py-4 text-[#151b22] text-lg drop-shadow-xl`,
  priceValue: `flex justify-center  font-bold mt-2`,
  button: `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  mintbutton: `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
}

const Game = () => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [loading, setLoading] = useState(true)
  const [balanceArray, setBalanceArray] = useState([0])
  const [NftBanalce, setNftBanalce] = useState([])
  const [mintFee, setmintFee] = useState([])
  const [formula, setFormula] = useState('')
  const [resultat, setResultat] = useState('0')
  const [elementA, setElementA] = useState({ value: 'mintStandard', label: 'Standard Elements' })
  const [elementB, setElementB] = useState({ value: 'mintStandard', label: 'Standard Elements' })
  const [nftaddress, setnftaddress] = useState()
  const [tokenAddress, setTokenAddress] = useState()
  const [allowed, setAllowance] = useState()
  const [network, setnetwork] = useState()
  useEffect( () => {
    searchnetwork()
  },[nftaddress])
  useEffect( () => {
    if (!tokenAddress) return
    accountInfo()
    window.ethereum.on('accountsChanged', function (accounts) {
      searchnetwork()
      accountInfo()
    })
  }, [tokenAddress])
  const confirmClaim = (msg) => toast(msg)

  async function searchnetwork() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      setnetwork(network)
      if (network.chainId == 1088) {
        setnftaddress(constants.Mgame);
        setTokenAddress(constants.Mtoken)
      } else if (network.chainId == 7700) {
        setnftaddress(constants.Cgame);
        setTokenAddress(constants.Ctoken)
      } else if (network.chainId == 250) {
        setnftaddress(constants.Fgame);
        setTokenAddress(constants.Ftoken)
      }
    } catch (e) {
      console.log(e)
    }
    console.log("setaddress")
  }
  async function accountInfo() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract1 = new ethers.Contract(tokenAddress, Token.abi, signer)
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
      const account = await signer.getAddress()
      const value = await contract1.allowance(account, nftaddress)
      const amount = value.toString()
      if (amount === '0') {
        setAllowance(false)
      } else {
        setAllowance(true)
      }
      setAccount(account)
      // balance
      const balance = await contract1.balanceOf(account)
      setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(2))
      // fee
      const mintFee = await contract2.fee.call();
      setmintFee(parseFloat(ethers.utils.formatEther(mintFee)));
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
      } else {
        console.log('You need to mint your first element')
      }
    } catch (e) {
      console.log(e.message)
    }
    console.log('loading account')
    setLoading(false)
  }
  function magicFormula(elementA, elementB) {

    const fusion = elementA.label + elementB.label
    const fusion0 = elementB.label + elementA.label
    for (let i = 0; i < options.length; i++) {
      if (fusion == options[i].label || fusion0 == options[i].label) {
        setResultat(options[i].value)
        setFormula(options[i].value)
        break
      }
      setResultat(1)
    }
  }

  async function Approuve() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.approve(nftaddress, "4400000000000000000000000000")
      await transaction.wait()
      setAllowance(true)
      confirmClaim('Approved successful!')
    }
  }
  async function setfundAddress() {
    if (account ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      const transaction = await contract2.setfundAddress("0x2e72Bd602522F937e350d872D572451f877BC8ec")
      await transaction.wait()
    }
  }
  async function Mint(element) {
    if (account) {
      console.log(element);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      const mintelement = element.toString();
      try {
        const transaction = await contract2[mintelement]();
        await transaction.wait()
        accountInfo()
        confirmClaim('transaction successful!')
      } catch (error) {
        console.log(error)
        if (error.data) {
          confirmClaim(error.data.message.toString())
          console.log(error.data.message.toString())
        } else {
          confirmClaim("you can't mint this element")
        }
      }
    }
  }
  async function mintStandard() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer);
      try {
        const transaction = await contract2.mintStandard();
        await transaction.wait()
        accountInfo()
        confirmClaim('transaction successful!')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="bg-sky-700 ">
      <Header />
      <div className={style.wrapper}>
      <div className='m-2 '>
        <div className={style.container}>
          <div className={style.titleContainer}>
            The Alchemist's Garden
          </div>
          <div className={style.info}>
            <div className='w-4/5 text-center bg-blue-500 py-8 px-8 rounded-xl mb-4'>
              {elementA.label}
            </div>
            <div className='w-4/5 text-center bg-blue-400 py-8 px-8 rounded-xl mb-4'>
              {elementB.label}
            </div>

          </div>
          <div className='mx-auto py-10 px-10'>

          </div>
          <div className={style.info}>
            <img
              className="justify-items-start h-[10rem] mx-auto animate-bounce "
              src={imagelist[elementA.value]}
              alt=""
            />
            <img
              className="justify-items-end h-[10rem] mx-auto  animate-bounce "
              src={imagelist[elementB.value]}
              alt=""
            />
          </div>

        </div>
        </div>
        <div className='m-2'>
          <div className=' justify-self-end '>

            {loading ? (
              <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
        
            ):(
              <div className=''>
              {allowed ? (
                <>
                  <div className={style.titleContainer}>
                    <span> Magic formula</span>

                  </div>
                  <div>
                    <span className='px-4 py-4 flex justify-center  font-bold mt-2'>Buy ALCHI token to mint New Elements
                      {network.chainId == 1088 ?
                        <a href="https://netswap.io/swap?inputCurrency=0x1d94cc954fce49db542a61d68901f787b874cf4b&outputCurrency/swap#/analytics/pairs/0xf2ad6d2bc50447c3688242c509a99bdd026ddcd7"
                          className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <span className="mx-10 ">Netswap</span>
                        </a> : (network.chainId == 250 ? (
                          <a href="https://spooky.fi/#/swap?inputCurrency=FTM&outputCurrency=0x36996c8642810add6c5bb814ed7a7ca8abc26fe0"
                          className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <span className="mx-10 ">SpookySwap</span>
                        </a>
                        ): (<a href="https://www.cantoswap.fi/#/swap"
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <span className="mx-10 ">CantoSwap</span>
                      </a>) )
                        
                      }


                    </span>
                  </div>
                  <label className='px-1 py-2 flex justify-center  mt-2 text-sm'> To start you need first to have standard elements, there are 4 elements the total fee is {4 * mintFee} ALCHI.</label>
                  <button className={style.button} onClick={() => mintStandard()}>Mint Standard Elements</button>
                  <div className='w-4/5 flex mx-auto py-8 px-8 '>
                    <Select
                      value={elementA}
                      onChange={setElementA}
                      options={elementsOptions}
                      className='w-4/5 mx-auto px-4'
                    />
                    <Select
                      value={elementB}
                      onChange={setElementB}
                      options={elementsOptions}
                      className='w-4/5 mx-auto px-4'
                    />
                  </div>
                  <label className='px-1 py-2 flex justify-center mt-2 text-sm'>Start searching for new elements, remember! you cant mint any new element <br />
                    if you don't owne element formula. Example Air + fire = Energy <br />
                    Your wallet need to have Air and Fire NFT.
                  </label>
                  <button className={style.button} onClick={() => magicFormula(elementA, elementB)}>try formula</button>
                  <div className='justify-self-center mx-auto py-4'>

                    {resultat == '0' ?
                      (<div className=''> </div>) :
                      resultat == 1 ?
                        <div className=' text-xl text-[#da4859] text-center '>Try new Formula </div>
                        : (
                          <div className='flex '>
                            <button className={style.mintbutton} onClick={() => Mint(resultat)} > {resultat} </button>
                            <Toaster
                              position="top-center"
                              reverseOrder={false}
                              gutter={8}
                              toastOptions={{
                                className: '',
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
                              }} />
                          </div>
                        )}
                  </div>
                </>
              ) : (
                <div>
                  <button className={style.button} onClick={() => Approuve()} >Approve to access</button>
                  <Toaster />
                </div>
              )

              }
            </div>
            )
          }

            <div className={style.titleContainer}>
              Account
            </div>
            <div className={style.priceValue}>
              <p className='text-sky-400 px-2 py-2'>Balance: {balance} ALCHI </p>
              <img
                src="https://littlealchi.xyz/imgs/logo_name.png"
                alt="ALCHI"
                className='py-2 px-2 h-10 mr-2'
              />

            </div>
            <div className={style.priceValue}>
              <p className='text-sky-400 px-2 py-2'> Mint Fee: {mintFee} ALCHI </p>

              <img
                src="https://littlealchi.xyz/imgs/logo_name.png"
                alt="MATIC"
                className='py-2 px-2 h-10 mr-2'
              />
            </div>
            <div className=" grid justify-items-stretch ">
              <p className={style.titleContainer}>ELEMENTS</p>
              <div className='flex grid grid-cols-4 gap-4 '>
                {
                  NftBanalce.map((item, index) => (
                    <NftElement
                      key={index}
                      item={item}
                    />
                  )
                  )
                }
              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}
export default Game
