/* global BigInt */
import React, { useEffect, useState } from "react";
import useAlchemy from "../hooks/useAlchemy";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
const Home = () => {
  const alchemy = useAlchemy();
  const navigate = useNavigate();
  const [blockNumber, setBlockNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setIsLoading(false);
    }
    getBlockNumber();
  }, [alchemy]);
  const fetchBalance = async (e) => {
    const address = e.target.value;
    setIsBalanceLoading(true);
    setBalance(0);
    try {
      const bal = await alchemy.core.getBalance(address, "latest");
      console.log(bal);
      setBalance(BigInt(bal).toString(10));
    } catch (e) {
      console.log(e);
    }
    setIsBalanceLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-700 flex flex-col">
      <div className="flex justify-center items-center gap-10 flex-wrap">
        <div className="px-8 pt-8 items-center justify-center text-white flex">
          Enter user's account address
          <input
            onBlur={fetchBalance}
            type="text"
            className="rounded m-4 p-3 text-black"
          ></input>
          {isBalanceLoading ? (
            <div className="mb-4">
              <BiLoaderCircle
                className="text-gray-400 mx-auto w-32 h-32 object-cover animate-pulse"
                alt="loading"
              />
            </div>
          ) : (
            <div className="text-white mb-4 flex items-center justify-center">
              {balance} wei
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="text-white">Loading</div>
      ) : (
        <div className="text-white">
          <p className="mx-auto w-fit">Current Block Number: {blockNumber}</p>
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
