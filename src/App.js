import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Block from "./pages/Block";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Transactions from "./pages/Transactions";


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:blockNumber" element={<Block />} />
          <Route path="/block/:blockNumber/txns" element={<Transactions />} />
          <Route path="/txn/:hash" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
