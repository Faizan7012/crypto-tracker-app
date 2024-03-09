import React, { useEffect, useState} from 'react'
import axios from "axios"
import { Spinner , Box, Image } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading
  } from '@chakra-ui/react'
const Baseurl  = 'https://api.coingecko.com/api/v3'
export default function Exchange() {

  const [loading, setLoading]=useState(true)
  const[exchanges, setExchanges]=useState([])
  useEffect(()=>{
    const getExchangesData=async()=>{
      const {data} =await axios.get(`${Baseurl}/exchanges`)
      console.log(data)
      setExchanges(data)
      setLoading(false)
    }
    getExchangesData() 
  },[])
  return (
    
   <>
     {
      loading ?  <Spinner size='xl' m='auto' mt='50px'/> : 

       <Box m = '50px 0px'>
        <Heading fontSize='20px' textAlign='center' mb='30px'>
            Crypto Currency <span style ={{color:'red'}}> Exchange Value</span>
        </Heading>
      <TableContainer w='80%' m='auto' mt='30px'>
  <Table size='md'>
    <Thead>
      <Tr justifyContent={'center'}>
        <Th>Image</Th>
        <Th>Currency Name</Th>
        <Th>Trade Volume 24h btc</Th>
        <Th>Trust Score</Th>
        <Th>Trust Score Rank</Th>
      </Tr>
    </Thead>
    <Tbody>

        {
                exchanges?.map((item,i)=>{
                    return(
                              <Tr key={item.name}>
                      <Td>
                        <Image maxW={"30px"} borderRadius={'50%'} src={item.image} alt="" />
                      </Td>
                      <Td>
                          {item.name}
                      </Td>
                      <Td>
                           {item.trade_volume_24h_btc.toFixed(0)}
                      </Td>
                      <Td >
                           {item.trust_score}
                      </Td>
                      <Td color ='green'>
                           #{item.trust_score_rank}
                      </Td>
                        </Tr>                     
                    )
                })
        }
    
    
    </Tbody>
  </Table>
</TableContainer>

       </Box>

     }
   </>
  )
}



