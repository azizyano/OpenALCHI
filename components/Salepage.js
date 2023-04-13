import { useState, useEffect } from 'react';

const style = {
  button: `text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 `,
  mintbutton: `text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
}

function SalePage() {
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
    // Set the countdown end time to now + 3 weeks on mount
    useEffect(() => {
      const countdownEndTime = new Date();
      countdownEndTime.setDate(countdownEndTime.getDate() + 20);
      setRemainingTime(countdownEndTime - new Date());
    }, []);
  
    // Update the remaining time every second
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1000);
      }, 1000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, []);
  
    if (remainingTime === null) {
      return <p>Loading...</p>;
    }
  
    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  const handleEthInputChange = (event) => {
    const ethAmount = event.target.value;
    const tokenAmount = ethAmount * 10000;
    setEthAmount(ethAmount);
    setTokenAmount(tokenAmount);
  };

  return (
  <>{remainingTime === null? (
    <></>
  ):
  (
    <div className=" flex items-center justify-between">
      <div>
        <p className='mb-2 p-4 font-light text-gray-400 dark:text-gray-300' >
      Hello everyone, we are excited to announce that our new token is now available for purchase!
      Our token is being sold for a fixed price of 10000 ALCHI for 1 ETH during a limited period of time,
      from 15th April to 5th May. Once the sale is finished,
      the token will be listed on a decentralized exchange (DEX) for trading.
      To participate in the sale, simply send the desired amount of ETH to our smart contract address.
      Each ETH will be exchanged for [insert token amount] of our tokens at the fixed price.
      </p>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">{days} days</h1>
        <h2 className="text-4xl font-medium mb-4">{hours} hours, {minutes} minutes, {seconds} seconds</h2>
        <p className="text-gray-500">until the countdown ends</p>
      </div>
      </div>
      
      <div className="max-w-lg w-full p-8 font-light text-gray-400 bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Buy ALCH Tokens</h1>
        <p className="mb-2">Total Tokens for Sale: 1,000,000 ALCH</p>
        <p className="mb-2">Price: 1 ETH = 10,000 ALCH</p>
        <div className="mb-2">
          <label className="block font-bold mb-2" htmlFor="ethAmount">
            Enter ETH Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ethAmount"
            type="number"
            step="any"
            placeholder="Enter ETH Amount"
            value={ethAmount}
            onChange={handleEthInputChange}
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="tokenAmount">
             {tokenAmount? (<> {tokenAmount} ALCHI </>) : (<> {tokenAmount} ALCHI </>) } 
          </label>
          <button className={style.button} onClick={() => Buy()} >Buy</button>
        </div>
      </div>
    </div>
  ) }
  
  </>
    
  );
}

export default SalePage;
