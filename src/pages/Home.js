import '../App.css';

require('dotenv').config();

import {useState, useEffect} from 'react';
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

function Home() {

  const [blocks, setBlocks] = useState([]);

  const getLatestBlock = async () => {
    try {
      let response = await axios.post(ALCHEMY_URL, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: ["latest", true]
      });

      const latestBlock = response.data.result;
      //console.log(blocks);

      if (blocks.length === 0) {
        //console.log("Added first block");
        setBlocks((blocks) => [...blocks, latestBlock])
      } else {
        let prevBlock = blocks[blocks.length - 1];
        if (prevBlock.number !== latestBlock.number) {
          setBlocks( (blocks) => [...blocks, latestBlock] );
        }
      }


    } catch(err) {
          console.error(err);
    }
  
  }

  useEffect( () => {
    getLatestBlock();

    const interval = setInterval( () => {
      getLatestBlock()
    }, 10000)

    return()=>clearInterval(interval)

  }, [])


  const latestBlocksList = blocks.slice(0).reverse().map(block => {
    return (
      <Tr>
        <Td>{Number(block.number)}</Td>
        <Td> {block.miner} </Td>
        <Td> 
          <Link
            px={2}
            py={1}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: "gray.200",
            }}
            href={"#/block/" + block.hash + "/transactions"}
          >
            {block.transactions.length}
          </Link>
        
        </Td>
      </Tr>
    )
  })



  return (
    <div className="App">
      <Table variant='simple'>
        <TableCaption>Block data</TableCaption>
        <Thead>
          <Tr>
            <Th>Block number</Th>
            <Th>Mined by</Th>
            <Th>Transactions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {latestBlocksList}
        </Tbody>
      </Table>
    </div>
  );
}

export default Home;

/*
0: "number"
1: "baseFeePerGas"
2: "difficulty"
3: "extraData"
4: "gasLimit"
5: "gasUsed"
6: "hash"
7: "logsBloom"
8: "miner"
9: "mixHash"
10: "nonce"
11: "parentHash"
12: "receiptsRoot"
13: "sha3Uncles"
14: "size"
15: "stateRoot"
16: "timestamp"
17: "totalDifficulty"
18: "transactions"
19: "transactionsRoot"
20: "uncles"
*/
