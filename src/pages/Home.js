/* global BigInt */
import React, { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const alchemy = useAlchemy();
  const navigate = useNavigate();
  const [blockNumber, setBlockNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setIsLoading(false);
    }
    getBlockNumber();
  }, [alchemy]);
  const fetchBalance = async(e) => {
    const address = e.target.value;
    try{
      const bal = await alchemy.core.getBalance(address, "latest");
      console.log(bal);
      setBalance(BigInt(bal).toString(10));
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div className="min-h-screen bg-gray-700">
      <div>
        Enter user's account address
        <input onChange={fetchBalance} type="text" className="rounded p-3"></input>
        <div className="text-white">{balance}</div>
      </div>
      {isLoading ? (
        <div className="text-white">Loading</div>
      ) : (
        <div className="text-white">
          <p>Current Block Number: {blockNumber}</p>
          <div>
            {[...Array(10)].map((x, i) => {
              return (
                <div
                  key={blockNumber - i}
                  className="cursor-pointer w-fit p-4 mx-auto"
                  onClick={() =>
                    navigate(`/block/${blockNumber - i}`, {
                      state: { blockNumber: blockNumber - i },
                    })
                  }
                >
                  {blockNumber - i}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
