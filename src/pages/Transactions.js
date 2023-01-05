import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAlchemy from "../hooks/useAlchemy";

const Transactions = () => {
  const navigate = useNavigate();
  const alchemy = useAlchemy();
  const { state } = useLocation();
  const [txns, setTxns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ctr, setCtr] = useState(15);
  useEffect(() => {
    setIsLoading(true);
    async function getTxns() {
      console.log(
        await alchemy.core.getBlockWithTransactions(state.blockNumber)
      );
      const transactions = await alchemy.core.getBlockWithTransactions(
        state.blockNumber
      );
      setTxns(transactions.transactions);
      setIsLoading(false);
    }
    getTxns();
  }, [alchemy.core, state.blockNumber]);

  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="p-4 text-white font-bold tracking-widest">
        Block Number: {state.blockNumber}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 text-white font-bold tracking-widest">
          Transactions
        </div>
        {isLoading ? (
          <div className="text-white text-lg">Loading....</div>
        ) : (
          <section className="py-4 px-10 my-4 mx-16 gap-4 flex flex-col rounded-md bg-white">
            {txns.slice(0, ctr)?.map((txn) => {
              return (
                <div
                  key={txn.transactionIndex}
                  onClick={() =>
                    navigate(`/txn/${txn.hash}`, {
                      state: { hash: txn.hash, timestamp: state.timestamp },
                    })
                  }
                  className="flex flex-col gap-5 justify-start p-4 border rounded cursor-pointer"
                >
                  <div className="flex gap-5 justify-start">
                    <p className="w-32 text-left">Hash</p>
                    <p>{txn.hash}</p>
                  </div>
                  <div className="flex gap-5 justify-start">
                    <p className="w-32 text-left">Transaction Index</p>
                    <p> {txn.transactionIndex}</p>
                  </div>
                </div>
              );
            })}
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

export default Transactions;
