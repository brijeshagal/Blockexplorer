import { Alchemy, Network } from "alchemy-sdk";
import { createContext} from "react";

const AlchemyContext = createContext({});

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export const AlchemyProvider = ({ children }) => {  
  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
};

export default AlchemyContext;
