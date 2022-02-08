import '../App.css';

require('dotenv').config();
import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {utils} from "ethers";
import {
  Link,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'


const ALCHEMY_URL = process.env.ALCHEMY_URL;
const axios = require('axios');


function Address() {

  const [accountBalance, setAccountBalance] = useState(0);

  const getAccountBalance = async (address) => {
    console.log(address);
    try {
      let response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [address, "latest"]
      });

      if (response.data.error) {
          throw new Error(response.data.error);
      }
      const balance = utils.formatEther(response.data.result);
      console.log(balance);

      setAccountBalance(balance)


    } catch(err) {
          console.error(err);
    }
  
  }

  const { address } = useParams();

  useEffect( () => {
    getAccountBalance(address);
  }, [])


  return (
    <div className="App">
      <p> Address: {address}</p>
      <p> Account Balance: {accountBalance} ETH</p>
    </div>
  );
}

export default Address;
