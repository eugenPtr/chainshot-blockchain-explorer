import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

import Home from './pages/Home';
import BlockTransactions from './pages/BlockTransactions';
import Address from './pages/Address';

ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/block/:blockHash/transactions" element={<BlockTransactions />} />
            <Route path="/address/:address" element={<Address />} />
          </Routes>
        </HashRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
