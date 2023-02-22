import Header from '../components/Header'
import Alchi from '../components/Alchi'
import Footer from '../components/Footer'
import {useWeb3, useSwitchNetwork} from '@3rdweb/hooks'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
const style = {
  walletConnectWrapper: `bg-sky-800 p-2 flex justify-center items-center h-screen `,
  info: `flex justify-between p-4  text-[#151b22] text-lg drop-shadow-xl`,
  button: `text-white bg-gradient-to-r from-purple-500 via-purple-700 to-purple-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-400 dark:focus:ring-purple-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  netbutton: `text-white bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
}
const Home = () => {
  const {address, connectWallet, getNetworkMetadata } = useWeb3()
  const supportChainIds = [1088, 7700, 250];
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
    <div className='w-full m-auto'>
      <Toaster position="top-left" reverseOrder={false} />
      <Header/>
      <Alchi/>
      <Footer/>
    </div>
  )
}

export default Home
