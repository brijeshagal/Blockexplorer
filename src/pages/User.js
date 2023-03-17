import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAlchemy from "../hooks/useAlchemy";

const User = () => {
  const alchemy = useAlchemy();
  const { state } = useLocation();
  const [txns, setTxns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ctr, setCtr] = useState(15);
  useEffect(() => {
    setIsLoading(true);
    async function getTxns() {
      const transactions = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: state.address,
        category: ["external", "internal"],
        order: "desc",
        excludeZeroValue: true,
        maxCount: 100,
      });
      console.log(transactions.transfers);
      setTxns(transactions.transfers);
      setIsLoading(false);
    }
    getTxns();
  }, [alchemy.core, state.address]);

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="p-4 text-white font-bold tracking-widest">
        User Address: {state.address}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 text-white font-bold tracking-widest">
          Transactions
        </div>
        {isLoading ? (
          <div className="text-white text-lg">Loading....</div>
        ) : (
          <section className="py-4 px-10 my-4 mx-16 gap-4 flex flex-col rounded-md bg-white">
            {txns.length > 0 ? (
              txns.slice(0, ctr)?.map((txn, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-5 justify-start p-4 border rounded cursor-pointer"
                  >
                    <div className="flex gap-5 justify-start">
                      <p className="w-32 text-left">Hash</p>
                      <p>{txn.hash}</p>
                    </div>
                    <div className="flex gap-5 justify-start">
                      <p className="w-32 text-left">Block: {txn.blockNum}</p>
                      <p className="w-32 text-left">Asset: {txn.asset}</p>
                      <p className="w-32 text-left">Value: {txn.value}</p>
                      <p className="w-32 text-left">Category: {txn.category}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-black ">No transactions yet!</div>
            )}
            {ctr >= txns.length ? (
              <></>
            ) : (
              <div>
                <button
                  onClick={() => setCtr(ctr + 10)}
                  className="bg-blue-300 text-white p-3 m-2 rounded"
                >
                  Load More
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default User;
