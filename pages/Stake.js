import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Select from 'react-select'
import constants from './../components/constants'
import NFT from './artifacts/LittleAlchemy.json'
import Token from './artifacts/Token.json'
import Staking from './artifacts/NFTStaking.json'
import Header from './../components/Header'
import reward1 from './../assets/reward1.png'
import magician from './../assets/magician.png'
import NftElement from './../components/NftElement'
import Image from 'next/image'
import {
  CgAttachment,
  CgChevronDoubleLeftO,
  CgShoppingBag,
  CgListTree,
} from 'react-icons/cg'
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
  container: ` py-4 px-4 rounded-xl `,
  wrapper: `justify-between items-stretch grid gap-6 mb-6 md:grid-cols-2 `,
  titleContainer: `text-4xl font-bold text-white mb-4`,
  info: `text-lg text-white mb-8`,
  priceValue: `flex justify-center  font-bold mt-2`,
  button0: `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2 mb-2 `,
  button: `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 `,
  mintbutton: `text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
}

const Stake = () => {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [balanceArray, setBalanceArray] = useState([0])
  const [NftBanalce, setNftBanalce] = useState([])
  const [nftaddress, setnftaddress] = useState()
  const [NFTid, setNFTid] = useState()
  const [NFTamout, setNFTamount] = useState('0')
  const [stakingBal, setStakingBal] = useState()
  const [APY, setAPY] = useState()
  const [totalReward, setTotalReward] = useState()
  const [selectedNFT, setselectedNFT] = useState()
  const [RewardBox, setRewardBox] = useState()
  const [reward, setReward] = useState()
  const [limitId, setlimitId] = useState()
  const [totalstakedByUser, setTotalstakedByUser] = useState()
  const [listId, setlistId] = useState({
    value: 'mintStandard',
    label: 'staking orders',
  })
  const [orderId, setOrderId] = useState('0')
  const [tokenAddress, setTokenAddress] = useState()
  const [stakingAddress, setStakingAdress] = useState()
  const [allowed, setAllowance] = useState()
  const [network, setnetwork] = useState()
  const [approvStake, setApprovedStake] = useState()
  const [elementA, setElementA] = useState({ })
  useEffect(() => {
    searchnetwork()
  }, [nftaddress])
  useEffect(() => {
    if (!tokenAddress || !network) return
    accountInfo()
    readContractstates()
    
    window.ethereum.on('accountsChanged', function (accounts) {
      searchnetwork()
      accountInfo()
      readContractstates()
    })
    window.ethereum.on('networkChanged', function (networkId) {
      searchnetwork()
      accountInfo()
      readContractstates()
    })
  }, [tokenAddress, network])

  const notification = (msg) => toast(msg)

  async function searchnetwork() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      setnetwork(network)
      if (network.chainId == 1088) {
        setnftaddress(constants.Mgame)
        setTokenAddress(constants.Mtoken)
        setStakingAdress(constants.MStaking)
      } else if (network.chainId == 7700) {
        setnftaddress(constants.Cgame)
        setTokenAddress(constants.Ctoken)
        setStakingAdress(constants.CStaking)
      } else if (network.chainId == 250) {
        setnftaddress(constants.Fgame)
        setTokenAddress(constants.Ftoken)
        setStakingAdress(constants.FStaking)
      } else if (network.chainId == 10) {
        setnftaddress(constants.Ogame)
        setTokenAddress(constants.Otoken)
      } else if (network.chainId == 420) {
        setnftaddress(constants.Otestgame)
        setTokenAddress(constants.Otesttoken)
        setStakingAdress(constants.OtestStaking)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function ApproveStake() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let transaction = await contract.setApprovalForAll(stakingAddress, true)
      await transaction.wait()
      setApprovedStake(true)
    } catch (error) {
      console.log(error)
    }
  }
  async function readContractstates() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract3 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const account = await signer.getAddress()
      const totalstaked = await contract3.totalStaked()
      const selectedNFT = await contract3.selectedNFT()
      const limitId = await contract3.limitId()
      const RewardBox = await contract3.RewardBox()
      const totalReward = await contract3.totalTokenReward()
      var reward = 0
      for (var i = 0; i < totalstakedByUser.length; i++) {
        try {
          const indexreward = await contract3.calculateReward(
            account,
            totalstakedByUser[i].index
          )
          reward += parseFloat(ethers.utils.formatEther(indexreward))
          console.log(totalstakedByUser.length, reward)
        } catch (error) {
          console.log(error)
        }
      }
      setReward(reward.toFixed(2))
      setselectedNFT(selectedNFT.toString())
      setlimitId(limitId.toString())
      setRewardBox(parseFloat(ethers.utils.formatEther(RewardBox)).toFixed(2))
      setTotalReward(
        parseFloat(ethers.utils.formatEther(totalReward)).toFixed(2)
      )
    } catch (e) {
      console.log(e.message)
    }
  }
  async function accountInfo() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract1 = new ethers.Contract(tokenAddress, Token.abi, signer)
      const contract2 = new ethers.Contract(nftaddress, NFT.abi, signer)
      const contract3 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const account = await signer.getAddress()
      const value = await contract1.allowance(account, nftaddress)
      const appro = await contract2.isApprovedForAll(account, stakingAddress)
      const totalstakedByUser = await contract3.getStakingInfo(account)
      const stakedBal = await contract3.stakedBalance(account)
      const totalstaked = await contract3.totalStaked()
      setApprovedStake(appro)

      const stakingBalance = await Promise.all(
        totalstakedByUser.map(async (i, key) => {
          let bal = {
            index: i.index.toString(),
            amount: i.amount.toString(),
            id: i.id.toString(),
            claimed: i.claimed,
          }
          return bal
        })
      )
      setTotalstakedByUser(stakingBalance)
      let selectstakingId = stakingBalance.map((e) => ({
        value: e.index,
        label: e.index,
      }))
      setlistId(selectstakingId)
      const amount = value.toString()
      if (amount === '0') {
        setAllowance(false)
      } else {
        setAllowance(true)
      }
      setAccount(account)
      // balance
      const balance = await contract1.balanceOf(account)
      setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(1))
      // APY
      const totalRewardPerYear = 0.001 * 5760 * 365
      const stakedPercentage = (stakedBal * 100) / totalstaked
      const stakedRewardPerYear = (totalRewardPerYear * stakedPercentage) / 100
      const apy = (stakedRewardPerYear * 100) / stakedBal
      setAPY(apy ? apy.toFixed(2) : '0')
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
        const stakingBal = await contract3.stakedBalance(account)
        setStakingBal(stakingBal.toString())
      } else {
        console.log('You need to mint your first element')
      }
    } catch (e) {
      console.log(e.message)
    }
    setLoading(false)
    
  }

  async function setfundAddress() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setfundAddress(
        '0x2e72Bd602522F937e350d872D572451f877BC8ec'
      )
      await transaction.wait()
    }
  }
  async function setSelectedNFT() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setselectedNFT('23')
      await transaction.wait()
    }
  }
  async function setrewardBox() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setRewardBox('10000000000000000000')
      await transaction.wait()
    }
  }
  async function setLimitId() {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract2 = new ethers.Contract(stakingAddress, Staking.abi, signer)
      const transaction = await contract2.setLimitId('2')
      await transaction.wait()
    }
  }
  async function Stake() {
    console.log(elementA.value, NFTamout)
    if (account && elementA.value ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.stake(elementA.value, NFTamout)
        await transaction.wait()
        notification('Grate! you are staking ', NFTamout, 'NFT id:', elementA.value)
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
      
    } else {
      notification('input required!')
    }
    accountInfo()
    readContractstates()
    
  }
  async function Claim() {
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.claimBox(selectedNFT)
        await transaction.wait()
        notification('Swap NFT id:', selectedNFT, ' to ', RewardBox, ' ALCHI')
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
    }
  }
  async function unStake() {
    console.log('unstake', orderId.value)
    if (account && orderId.value ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract2 = new ethers.Contract(
          stakingAddress,
          Staking.abi,
          signer
        )
        const transaction = await contract2.unstake(orderId.value)
        await transaction.wait()
        notification('Unstake successful!')
      } catch (error) {
        console.log(error)
        notification(error.message.toString())
      }
    } else {
      notification('input required!')
    }
    accountInfo()
    readContractstates()
  }
  const onChangeHandler = (event) => {
    setNFTamount(event.target.value)
  }
  
  return (
    <div className="bg-gray-700  ">
      <Header />
      <div className="text-neutral mb-10 flex items-center text-white">
        <div className="ml-0.5 flex flex-col gap-1">
          <div className="bg-light h-2 w-1 rounded-md"></div>
          <div className="bg-light h-2 w-1 rounded-md"></div>
          <div className="bg-light h-2 w-1 rounded-md"></div>
        </div>
        <div>
          {account === '0xD687ca2fa168e7BAbed632803F6E4b06ef98B764' ? (
            <div>
              <button
                className={style.button0}
                onClick={() => setfundAddress()}
              >
                setfundAdrress
              </button>
              <button
                className={style.button0}
                onClick={() => setSelectedNFT()}
              >
                setselectedNFT
              </button>
              <button className={style.button0} onClick={() => setrewardBox()}>
                setRewardBox
              </button>
              <button className={style.button0} onClick={() => setLimitId()}>
                setLimitId
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        
        <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-red-800 dark:text-blue-400" role="alert">
            <CgAttachment/>
            <div>
              <span className="font-medium">Important!</span> Staking will be limited for 4  NFT Elements: Computer, Internet, Blockchain and Bitcoin
            </div>
          </div>
      </div>
        
      <div className="flex flex-col gap-6 text-white lg:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col items-center gap-6">
          <Image className="my-8" src={magician} width="180" alt="" />
          <div className="flex w-60 ">
            {NftBanalce?.map((item, index) => (
              <NftElement key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-6">
          <div className="w-full max-w-[560px]">
            <div className="text-neutral" data-rttabs="true">
              <ul
                className="flex list-none flex-row flex-wrap gap-4"
                role="tablist"
              >
                <li
                  className="group-hover:bg-light hover:bg-light react-tabs__tab--selected flex-auto rounded-2xl text-center transition hover:duration-150 hover:ease-in-out focus-visible:outline-none"
                  role="tab"
                  id="tab:r1:0"
                  aria-selected="true"
                  aria-disabled="false"
                  aria-controls="panel:r1:0"
                  tabindex="0"
                  data-rttab="true"
                >
                  <div className="border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
                    Element to Stake
                    <div>
                      <Select
                        className="m-2 p-2 text-sm text-black"
                        value={elementA}
                        onChange={setElementA}
                        options={elementsOptions}
                      />
                    </div>
                    <div class=" mb-6">
                      <input
                        type="number"
                        value={NFTamout}
                        onChange={onChangeHandler}
                        className="sm:text-md  m-2 block rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      ></input>
                      
                    </div>
                    {approvStake ? (
                      <button className={style.button} onClick={() => Stake()}>
                        Stake
                      </button>
                    ) : (
                      <button
                        className={style.button}
                        onClick={() => ApproveStake()}
                      >
                        Approve
                      </button>
                    )}
                    <Toaster />
                  </div>
                </li>
                <li
                  className="group-hover:bg-middle hover:bg-middle flex-auto rounded-2xl text-center transition hover:duration-150 hover:ease-in-out focus-visible:outline-none"
                  role="tab"
                  id="tab:r1:1"
                  aria-selected="false"
                  aria-disabled="false"
                  aria-controls="panel:r1:1"
                  data-rttab="true"
                >
                  <div className="border-light bg-light block w-full rounded-2xl border-[1px] py-2 font-light leading-5 outline-none focus:outline-none focus-visible:outline-none">
                    UnStake & Claim
                    <div>
                      <Select
                        className="m-2 p-2 text-sm text-black"
                        value={orderId}
                        onChange={setOrderId}
                        options={listId}
                      />
                    </div>
                    <div class=" mb-6"></div>
                    <div>
                      <button
                        className={style.button}
                        onClick={() => unStake()}
                      >
                        UnStake and Claim
                      </button>
                    </div>
                    <button
                      className={style.button}
                      onClick={() => setfundAddress()}
                    >
                      Claim
                    </button>
                  </div>
                </li>
              </ul>
              <div
                className="react-tabs__tab-panel react-tabs__tab-panel--selected"
                role="tabpanel"
                id="panel:r1:0"
                aria-labelledby="tab:r1:0"
              ></div>
              <div
                className="react-tabs__tab-panel"
                role="tabpanel"
                id="panel:r1:1"
                aria-labelledby="tab:r1:1"
              ></div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">NFT Balance</div>
                <div className="text-right">Staked</div>
              </div>
            </div>
            <div>
              <div className="text-light flex justify-between py-4 text-[20px] font-light sm:text-[24px]">
                <div className="text-left">{NftBanalce.length} </div>
                <div className="text-right"> {stakingBal}</div>
              </div>
            </div>
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left"> Balance</div>
                <div className="text-right">Reward</div>
              </div>
            </div>
            <div>
              <div className="text-neutral flex justify-between text-[18px] font-extralight sm:text-[20px]">
                <div className="text-left"> {balance} ALCHI</div>
                <div className="text-right"> {reward} ALCHI</div>
              </div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">Total Reward</div>
                <div className="text-right">Staking APY</div>
              </div>
            </div>
            <div>
              <div className="text-middle flex justify-between pt-4 text-[18px] font-light sm:text-[24px]">
                <div className="text-left">{totalReward} ALCHI</div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p> {APY} %</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-supplyBase flex w-full max-w-[560px] flex-col justify-between rounded-2xl px-7 py-5">
            <div>
              <div className="text-neutral flex justify-between text-[16px] font-thin">
                <div className="text-left">Amount</div>
                <div className="text-right">
                  Lucky NFT: {title[selectedNFT]}
                </div>
              </div>
            </div>
            <div>
              <div className="text-middle flex justify-between pt-4 text-[18px] font-light sm:text-[24px]">
                <div className="text-left"> {RewardBox} ALCHI</div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <button className={style.button} onClick={() => Claim()}>
                      Swap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-6">
          {totalstakedByUser ? (
            <div className="flex p-2">
              {totalstakedByUser.map((i, key) => (
                <div className='bg-sky-800 border rounded-lg m-1 shadow-sm text-gray-200' key={key}>
                  <span className="flex items-center justify-center p-2 text-xs">
                    {' '}
                    Index: {i.index}{' '}
                  </span>

                  <span className="flex items-center justify-center p-2 text-xs "> NFT Id: {i.id} </span>
                  {i.id <= 20 ? (
                    <span className="flex items-center justify-center p-2 text-xs">reward factor: 25 %</span>
                  ): (i.id == 21 ? (
                    <span className="flex items-center justify-center p-2 text-xs">reward factor: 50 %</span>
                  ): (i.id == 22 ? (
                    <span className="flex items-center justify-center p-2 text-xs">reward factor: 75 %</span>
                  ): (
                    <span className="flex items-center justify-center p-2 text-xs">reward factor: 75 %</span>
                  )
                    )) }
                  <span className="flex items-center justify-center p-2 text-xs">
                    {' '}
                    Amount: {i.amount}{' '}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className=" flex items-center justify-center">
              <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                loading...
              </div>
            </div>
          )}
          <Image className="my-8 py-10" src={reward1} width="100" alt="" />
        </div>
      </div>
    </div>
  )
}
export default Stake
