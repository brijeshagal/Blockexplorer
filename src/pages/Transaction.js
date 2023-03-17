/* global BigInt */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAlchemy from "../hooks/useAlchemy";

const Transaction = () => {
  const alchemy = useAlchemy();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [txnDetails, setTxnDetails] = useState({});
  const [checkAgain, setCheckAgain] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getTxnDetails = async () => {
      try {
        const details = await alchemy.core.getTransactionReceipt(state.hash);
        setTxnDetails(details);
        setIsLoading(false);
        if(!details.transactionIndex){
          setCheckAgain(!checkAgain);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTxnDetails();
  }, [alchemy.core, state.hash, checkAgain]);
  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="p-4 text-white font-bold tracking-wider">
        Transaction Details
      </div>
      {isLoading ? (
        <div className="text-white font-lg">Loading...</div>
      ) : (
        <section className="py-4 px-10 my-4 mx-16 gap-4 flex flex-col rounded-md bg-white">
          <div className="flex justify-start p-4 border rounded">
            <p className="w-36 text-left">Transaction Hash</p>
            <p>{txnDetails.transactionHash}</p>
          </div>
          <div className="flex justify-start p-4 border rounded">
            <p className="w-36 text-left">Transaction Index</p>
            <p>{txnDetails.transactionIndex?txnDetails.transactionIndex:"Pending.."}</p>
          </div>
          <div className="flex justify-start p-4 border rounded">
            <p className="w-36 text-left">Timestamp</p>
            <p>{state.timestamp}</p>
          </div>
          <div className="flex justify-start p-4 border rounded">
            <p className="w-36 text-left">Block</p>
            <p>{txnDetails.blockNumber?txnDetails.blockNumber:"Pending.."}</p>
          </div>
          <div className=" p-4 border rounded">
            <div className="flex justify-start pb-2">
              <p className="w-36 text-left">From</p>
              <p className="w-36 text-left">{txnDetails.from}</p>
            </div>
            <div className="flex justify-start">
              <p className="w-36 text-left">To</p>
              <p className="w-36 text-left">{txnDetails.to}</p>
            </div>
          </div>
          <div className="flex justify-start p-4 border rounded">
            <p className="w-36 text-left">Gas Used</p>
            <p>{BigInt(txnDetails.gasUsed._hex).toString(10)}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Transaction;
