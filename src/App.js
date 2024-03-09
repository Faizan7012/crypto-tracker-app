import { Box } from '@chakra-ui/react';
import './App.css';
import Navbar from './components/navbar';
import AllRoutes from './components/AllRoutes';


function App() {
  return (
    <Box className="App" >
        <Navbar />
        <AllRoutes />
    </Box>
  );
}

export default App;
