import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return <Flex  justifyContent='space-between' gap={'20px'} p='20px' alignItems='center' borderBottom = '1px solid gray' >
          <Heading  fontSize = '20px'>Crypto <span style={{color:'red'}}>Tracker</span></Heading>
          <Flex  justifyContent='space-between' gap={['20px','30px','50px','100px']}>
          <Link className="navlink" to='/' >Dashboard</Link>
          <Link className="navlink" to='/exchange' >Exchange Rate</Link>
          </Flex>
    </Flex>
}