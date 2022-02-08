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


const axios = require('axios');
const ALCHEMY_URL = process.env.ALCHEMY_URL;


function BlockTransactions() {

  const [blockTransactions, setBlockTransactions] = useState([]);

  const getBlockTransactions = async (blockHash) => {
    console.log(blockHash);
    try {
      let response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByHash",
        params: [blockHash, true]
      });

      if (response.data.error) {
          throw new Error(response.data.error);
      }
      const transactions = response.data.result.transactions;
      console.log(transactions);
      console.log(Object.keys(transactions[0]));

      setBlockTransactions(transactions)


    } catch(err) {
          console.error(err);
    }
  
  }

  const { blockHash } = useParams();

  useEffect( () => {
    getBlockTransactions(blockHash);
  }, [])


  const blockTransactionsList = blockTransactions.slice(0).reverse().map(tx => {
    return (
      <Tr>
        <Td> {tx.hash} </Td>
        <Td> 
          <Link
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: "gray.200",
            }}
            href={"#/address/" + tx.from}
          >
            {tx.from}
          </Link>
        </Td>

        <Td> 
          <Link
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: "gray.200",
            }}
            href={"#/address/" + tx.to}
          >
            {tx.to}
          </Link>
        </Td>
        <Td> {utils.formatEther(tx.value)} </Td>
        <Td> {tx.type} </Td>
        <Td> {Number(tx.gas)} </Td>
      </Tr>
    )
  })



  return (
    <div className="App">
      <Table variant='simple'>
        <TableCaption>Transactions</TableCaption>
        <Thead>
          <Tr>
            <Th>Transaction Hash</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Value (Eth)</Th>
            <Th>Type</Th>
            <Th>Gas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {blockTransactionsList}
        </Tbody>
      </Table>
    </div>
  );
}

export default BlockTransactions;
