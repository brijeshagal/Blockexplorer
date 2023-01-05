/* global BigInt */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAlchemy from "../hooks/useAlchemy";

const Block = () => {
  const alchemy = useAlchemy();
  const navigate = useNavigate();
  const [blockDetails, setBlockDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  useEffect(() => {
    setIsLoading(true);
    const getBlockDetails = async () => {
      const details = await alchemy.core.getBlock(state.blockNumber);
      setBlockDetails(details);
      console.log(details);
      setIsLoading(false);
    };
    getBlockDetails();
  }, [alchemy.core, state.blockNumber]);
  return (
    <div className="bg-gray-700 min-h-screen">
      <div className=" p-4 text-white font-bold tracking-wider">
        Block #{state.blockNumber}
      </div>
      {isLoading ? (
        <div className="text-white font-lg">Loading...</div>
      ) : (
        <section className="py-4 px-10 my-4 mx-16 gap-4 flex flex-col rounded-md bg-white">
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Block Height</p>
            <p>{blockDetails.number}</p>
          </div>
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Timestamp</p>
            <p>{blockDetails.timestamp}</p>
          </div>
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Difficulty</p>
            <p>{blockDetails.difficulty}</p>
          </div>
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Transactions</p>
            <p>
              <span
                onClick={() => navigate(`/block/${state.blockNumber}/txns`, {state: {blockNumber: state.blockNumber, timestamp: blockDetails.timestamp}})}
                className="p-2 rounded text-sm cursor-pointer bg-blue-300 text-white"
              >
                {blockDetails.transactions.length} transactions
              </span>{" "}
              are in this block
            </p>
          </div>
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Gas Limit</p>
            <p>{BigInt(blockDetails.gasLimit._hex).toString(10)}</p>
          </div>
          <div className="flex gap-5 justify-start p-4 border rounded">
            <p className="w-32 text-left">Gas Limit</p>
            <p>{BigInt(blockDetails.gasLimit._hex).toString(10)}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Block;
