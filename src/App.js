import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./context/Navbar";
import NFT from "./pages/NFT";
import Block from "./pages/Block";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Transactions from "./pages/Transactions";
import User from "./pages/User";

function App() {
  return (
    <div className="bg-gray-700">
      <BrowserRouter>
        <Navbar />
        <div className="pt-24">
          <Routes>
            <Route path="/block/:blockNumber" element={<Block />} />
            <Route path="/block/:blockNumber/txns" element={<Transactions />} />
            <Route path="/user/:address" element={<User />} />
            <Route path="/txn/:hash" element={<Transaction />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
