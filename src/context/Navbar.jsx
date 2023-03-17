import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt, BiSearchAlt } from "react-icons/bi";
export const Navbar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(null);
  const handleClick = () => {
    // console.log(input.length);
    if (input.length === 66) {
      setInput(null);
      navigate(`/txn/${input}`, { state: { hash: input } });
    } else {
      setInput(null);
      navigate(`/user/${input}`, { state: { address: input } });
    }
  };

  return (
    <header className="text-gray-600 bg-slate-600 shadow-lg shadow-gray-400 fixed w-full">
      <div className="container flex flex-wrap p-5 flex-col md:flex-row items-center">
        <button
          className="inline-flex items-center text-gray-100 border-0 py-1 px-3 focus:outline-none  rounded text-base font-extrabold tracking-widest uppercase h-full"
          onClick={() => navigate("/")}
        >
          BLOCK EXPLORER
        </button>
        <button
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ml-auto mr-4"
          onClick={() => navigate("/nft")}
        >
          NFT
        </button>
        <label className="mt-4 md:mt-0 flex bg-gray-100 border-0 pl-3 rounded focus:outline-none hover:bg-gray-200">
          <BiSearchAlt className="text-black my-auto mr-2" />
          <input
            className="inline-flex items-center rounded focus:outline-none py-1 px-3 text-base mt-4 md:mt-0"
            placeholder="Search Txn"
            onChange={(e) => setInput(e.target.value)}
          />
          <BiRightArrowAlt
            onClick={handleClick}
            className="cursor-pointer text-lg text-black my-auto ml-2"
          />
        </label>
      </div>
    </header>
  );
};
