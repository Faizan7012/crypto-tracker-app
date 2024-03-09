import { Box , Image } from "@chakra-ui/react";
import notFound from './404.webp'
import { Link } from "react-router-dom";

export default function NotFound(){
    return <Box>
           <Link to='/'>
           <Image maxW='80%' m='auto' src={notFound}/>
           </Link>
    </Box>
}