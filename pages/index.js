import Header from '../components/Header'
import Alchi from '../components/Alchi'
import {useWeb3, useSwitchNetwork} from '@3rdweb/hooks'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}
const Home = () => {
  const {address, chainId, connectWallet, getNetworkMetadata } = useWeb3()
  const supportChainIds = [1088];
  const { switchNetwork } = useSwitchNetwork();
  const welcome = (address, toatHandler = toast) => {
    toatHandler.success(
      `${address !== 'Unnamed' ? ` ${address}` : ''}`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (!address) return
    welcome(address)
    
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-left" reverseOrder={false} />
      {address ? ( 
        <>
          <Header/>
          <Alchi/>
        </>
      ):(
        <div className={style.walletConnectWrapper}>
            <button className={style.button}
            onClick={() => connectWallet('injected')}
            >
              Connect Wallet
            </button>
            <div className='mx-auto justify justify-center '>
            <p className='mx-10 px-10 py-10 text-xl'>Switch Network</p>
            {supportChainIds.map((cId) => (
              <button className='mx-10 px-10 py-10 border text-white text-xl' onClick={() => switchNetwork(cId)}>
                {getNetworkMetadata(cId)?.chainName ? getNetworkMetadata(cId)?.chainName : 'Andromeda mainnet'}
              </button>
            ))}
            </div>
           
            
        </div>
        
      )}
    </div>
  )
}

export default Home
