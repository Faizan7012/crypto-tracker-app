import React,{useState, useEffect, memo} from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Button, Flex, Spinner } from '@chakra-ui/react';
const Baseurl  = 'https://api.coingecko.com/api/v3'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 function CoinChart({currency , id , profit}){
    const [chartData, setChartData]=useState([])
    const [days, setDays]=useState(1)
    
    const CoinChartData=async()=>{
        try {
            const { data } = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
            setChartData(data.prices)
        } catch (error) {
            console.log(error)  
        }
    }

    useEffect(()=>{
        CoinChartData() 
    },[currency, id, days])

  const myData = {
    labels: chartData.map((value)=>{
     const date = new Date(value[0])
     const time = 
     date.getHours()> 12 
     ? `${date.getHours() -12} : ${date.getMinutes()} PM` 
     : `${date.getHours()} : ${date.getMinutes()} AM`
      return days===1 ? time : date.toLocaleDateString() 
    }), 
    datasets:[
        {
            label: ` Price in Past Days ${days} in ${currency} `,
            data: chartData.map((value)=>value[1]),
            borderColor: profit ? 'green':'red',
            borderWidth: '3' 
        }
    ]
    
  }




  return (
     <>
     {
      chartData.length === 0 ? <Spinner size='xl' m='auto' mt='50px'/> : (

        <Box>
        <Line data={myData} options={{
          elements:{
              point:{
                  radius:1, 
              }
          }
        }} style={{marginTop:"5rem", maxWidth:"100%"}} />
  
             <Flex gap={'20px'} alignItems='center'>
               <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setDays(1)} >24 hours</Button>
               <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setDays(30)}>1 Month</Button>
               <Button bg='teal' _hover={'none'} color='white' fontFamily='"Noto Sans Mono", monospace' onClick={()=>setDays(365)}>1 Year</Button>
             </Flex>
      </Box>
      )
     }
     </>
  )
}


export default memo(CoinChart);

