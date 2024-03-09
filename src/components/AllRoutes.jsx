import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import NotFound from './404Found';
import Exchange from './Exchange';
import CoinDetails from './coinDetails';

export default function AllRoutes(){
    return  <Routes>
    <Route path='/' element={<Dashboard />}></Route>
    <Route path='/exchange' element={<Exchange />}></Route>
    <Route path='/coin/:id' element={<CoinDetails />}></Route>
    <Route path='*' element={<NotFound />}></Route>
  </Routes>
}