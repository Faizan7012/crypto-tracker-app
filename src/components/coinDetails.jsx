import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import { IoPulseOutline } from "react-icons/io5"
import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import CoinChart from './coinChart'
const Baseurl  = 'https://api.coingecko.com/api/v3'

export default function CoinDetails(){
  const [coin, setCoin]=useState([])
  const [loading, setLoading]=useState(true)
  const {id} = useParams()
  const [currency, setCurrency]=useState('inr')
  const currencySymbol = currency ==='inr' ? '₹': '$'
  const profit = coin.market_data?.price_change_percentage_24h > 0   
    useEffect(()=>{
       const getCoin =async()=>{
         try {
           const {data} =await axios.get(`${Baseurl}/coins/${id}`)
           console.log(data)
           setCoin(data)
           setLoading(false)
         } catch (error) {
          console.log(error)
          setLoading(false)
         }
       }
       getCoin() 
    },[id])
  return (
  <>
  {
    loading ? <Spinner size='xl' m='auto' mt='50px'/> : <> 
         <Box w='98%' m='auto' p='30px' alignItems='center' gap='50px' fontFamily='"Noto Sans", sans-serif'>

             <Flex w={'90%'} justifyContent={'space-evenly'} alignItems={'center'} flexDirection={['column','column','row','row']}>
             <Flex gap='20px' >
             <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setCurrency('inr')} >INR ₹</Button>
             <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setCurrency('usd')}>USD $</Button>
               </Flex>
              <Box className="time" mt='20px' mb='30px' color = 'red' fontWeight={'500'}>
              {coin.last_updated}
              </Box>
             </Flex>



             <Flex w={'97%'} gap='30px' alignItems={'center'} m='auto' mb='50px' flexDirection={['column','column','row','row']}>

               <Box  w={['100%','100%','30%','25%']} m='auto'>
               <Box>
                <Box className="coin-image">
                <Image maxW='130px' borderRadius={'50%'} src={coin.image.large} alt={coin.name} />
              </Box>
              <Box className="coin-name">
              <Text fontSize={'25px'} fontFamily='"Noto Sans", sans-serif' mt='10px'>{coin.name}</Text>
              </Box>
                </Box>
                <Box>
                <Box className="coin-price">
             {currencySymbol}{coin.market_data.current_price[currency]}
              </Box>
              <Flex className="coin-profit" gap='5px' alignItems='center'>
              {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />  }
                        <Text>{coin.market_data.price_change_percentage_24h} % </Text>
              </Flex>
              <Flex className='market-rank' gap='5px' alignItems='center'>
                <IoPulseOutline color='orange' /> 
                <Text> #{coin.market_cap_rank}</Text>
              </Flex>
                </Box>

                <Box className='coin-desc'>
                <Text>     {coin.description['en'].split('.')[0]} </Text>
                </Box>
               </Box>
               <Box w={['100%','100%','70%','75%']} m='auto'>
               <CoinChart currency={currency} id={id} profit={coin.market_data.price_change_percentage_24h>0?true:false}/> 
               </Box>

             </Flex>
         </Box>
       
    </> 
  }
  
  </>
  )
}



