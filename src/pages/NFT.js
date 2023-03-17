import React, { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import useAlchemy from "../hooks/useAlchemy";

const NFT = () => {
  const alchemy = useAlchemy();
  const [metadata, setMetadata] = useState(null);
  const [NFT, setNFT] = useState(null);
  const [address, setAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [img, setImg] = useState(null);
  const fetchMetadata = async (e) => {
    setIsNFTLoading(true);
    try {
      console.log(address, tokenId);
      if (tokenId !== null) {
        const response = await alchemy.nft.getNftMetadata(address, tokenId);
        console.log(response);
        setMetadata(response.contract);
        setNFT(response.rawMetadata);
        const src = await response.rawMetadata.image.split("/");
        console.log(src);
        setImg("https://ipfs.io/ipfs/"+src[2])
      } else {
        const response = await alchemy.nft.getContractMetadata(address);
        console.log(response);
        setMetadata(response);
        setNFT(null);
      }
    } catch (e) {
      setMetadata(null);
      setTokenId(null);
      console.log(e);
    }
    setIsNFTLoading(false);
  };
  return (
    <div className="">
      <div className="px-8 pt-8 items-center justify-start flex-col w-full min-h-screen flex text-white">
        <p className="">
          Enter nft address or metadata
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="rounded m-4 p-3 text-black"
          ></input>
          Enter nft token id
          <input
            onChange={(e) => setTokenId(e.target.value)}
            type="text"
            className="rounded m-4 p-3 text-black"
          ></input>
          <button
            onClick={fetchMetadata}
            className="p-2 rounded hover:bg-gray-400 bg-gray-100 text-black"
          >
            Submit
          </button>
        </p>
        {isNFTLoading ? (
          <div className="mb-4">
            <BiLoaderCircle
              className="text-gray-400 mx-auto w-32 h-32 object-cover animate-pulse"
              alt="loading"
            />
          </div>
        ) : metadata ? (
          <div className="text-white mb-4 flex flex-col">
            <div className="w-fit mx-auto uppercase tracking-widest font-bold m-2">
              NFT Details
            </div>
            <div className="flex flex-wrap bg-gray-400 text-black p-1 m-1 rounded justify-center items-center">
              <div className="p-2 flex flex-col justify-center items-center">
                <img
                  src={img}
                  alt="NFT"
                ></img>
              </div>
              <div className="flex flex-col justify-center font-semibold p-2">
                <div className="py-2 ">
                  NFT Address:{" "}
                  <span className="text-gray-700">{metadata?.address}</span>
                </div>
                <div className="py-2 ">
                  Name: <span className="text-gray-700">{metadata?.name}</span>
                </div>
                <div className="w-fit mx-auto py-3 font-bold uppercase decoration-black tracking-widest">
                  OpenSea Details
                </div>
                <div className="py-2 ">
                  Floor Price:{" "}
                  <span className="text-gray-700">
                    {metadata?.openSea?.floorPrice}
                  </span>
                </div>
                <div className="py-2 ">
                  Symbol:{" "}
                  <span className="text-gray-700">{metadata?.symbol}</span>
                </div>
                <div className="py-2 ">
                  Token Type:{" "}
                  <span className="text-gray-700">{metadata?.tokenType}</span>
                </div>
                <div className="py-2 ">
                  Total Supply:{" "}
                  <span className="text-gray-700">{metadata?.totalSupply}</span>
                </div>
                {NFT ? (
                  <div>
                    <div className="py-2 ">
                      Last Updated
                      <span className="text-gray-700">
                        {NFT?.timeLastUpdated}
                      </span>
                    </div>
                    <div className="w-fit mx-auto py-3 font-semibold uppercase decoration-black">
                      Attributes
                    </div>
                    <div>
                      {NFT?.attributes?.map((data, index) => {
                        return (
                          <div key={index} className="py-2 ">
                            {data?.trait_type}:{" "}
                            <span className="text-gray-700">{data?.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NFT;
