import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading, Image, Input, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { FaCaretUp , FaCaretDown } from "react-icons/fa";
const Baseurl  = 'https://api.coingecko.com/api/v3'
export default function Coins() {
  const [loading, setLoading]=useState(true)
  const[coins, setCoins]=useState([])
  const [currency, setCurrency]=useState('usd')
  const [search, setSearch]=useState('')
  const currencySymbol = currency ==='inr' ? '₹': '$';
  useEffect(()=>{
    const getCoinsData=async()=>{
       try {
        const {data} =await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}&days=1`)
      console.log(data)
      setCoins(data)
      setLoading(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
    }
    getCoinsData();
  },[currency])
 
  return (
    <>
      {
        loading? <Spinner size='xl' m='auto' mt='50px'/> : <> 
           <Flex w='90%' m='auto' mb='50px' mt='50px' gap='10px'>
            <Input
            type="text" 
            placeholder='Search Your Coins ' 
            onChange={(e)=>setSearch(e.target.value)}
            />
             <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setCurrency('inr')} >INR ₹</Button>
             <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setCurrency('usd')}>USD $</Button>
           </Flex>
           <SimpleGrid w={['320px' ,'500px','800px','90%']} columns={['1','2','3','4']} m='auto' gap='20px' p='20px'>
           { 
            coins.filter((data)=>{
               if(data == ''){
                return data
               } else if(data.name.toLowerCase().includes(search.toLowerCase())){
                   return data
               }
            }).map((coindata, i)=>{
              return(
              <CoinCard key={i} coindata={coindata} id={coindata.id}  i={i} currencySymbol={currencySymbol} currency={currency} />
              )
            })
          }
           </SimpleGrid>
        
        </> 
      }
    </>
  )
}

const  CoinCard=({coindata, currencySymbol, i, id ,})=>{
  const profit = coindata.price_change_percentage_24h>0 
  return(
   <Link to={`/coin/${id}`} style={{color:"white", textDecoration:'none'}} className={profit ? 'greendiv' :'reddiv'}>
          <Box p={['10px','10px','20px','30px']} alignItems='center'
           border={profit ? '1px solid green' :'1px solid red'} borderRadius='5px'
           >
           <Flex justifyContent='space-between' alignContent={'center'}>
            <Box>
                  <Image maxW='50px' src={coindata.image}  alt={coindata.id} />
                  <Text fontSize={'25px'} fontFamily='"Noto Sans", sans-serif' mt='10px'>{coindata.id}</Text>
                  <Text fontFamily='"Noto Sans", sans-serif'>{coindata.symbol.toUpperCase()} 24H</Text>
            </Box>
            <Flex justifyContent='right' flexDirection={'column'}>
              <Heading fontFamily='"Noto Sans Mono", monospace' fontSize={'25px'}>
              {currencySymbol}{coindata.current_price.toFixed(0)}
              </Heading>
              <Box bg={profit ?'#1A8917' :'#B30000'} fontFamily='"Noto Sans Mono", monospace' color='white' borderRadius={'5px'} mt='10px'>
              <Flex gap='5px' alignItems='center' p='2px 10px' >
              <span>{profit ? <FaCaretUp /> : <FaCaretDown />}</span>
             {profit ? "+" + coindata.price_change_percentage_24h.toFixed(2): coindata.price_change_percentage_24h.toFixed(2)}
              </Flex>
              </Box>
            </Flex>
           </Flex>
           <Box mt='10px' w='90%' m='auto'>
           </Box>
 </Box>
   </Link>
   
  )
}



