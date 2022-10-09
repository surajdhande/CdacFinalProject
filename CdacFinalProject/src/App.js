//import logo from './logo.svg';
import './App.css';
//import Header from './components/Header';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import SearchProduct from './components/SearchProduct';
import SPRegistration from './components/SPRegistration';
import ServiceproviderHome from './components/ServiceProviderHome';
import CustomerHome from './components/CustomerHome';
import Home from './components/Home';
import UploadProduct from './components/UploadProduct';
import SearchService from './components/SearchService'
import CustomerRegistration from './components/CustomerRegistration'
import Order from './components/Order';
import ViewRequest from './components/ViewRequest';
import Solution from './components/Solution';
import Validation from './components/Validation';
import Call from './components/Help';
import Getallusers from './components/Getallusers';
import SearchProducts from './components/withoutloginproducts';
import Aboutus from './components/Aboutus';
import Help from './components/Help';
import Rating from './components/Rating';
//import Protected from './components/Protected'
//import { Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     
    
      <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/> 
      <Route path='/searchproduct' element={<SearchProduct/>}/> 
      <Route path='/uploadproduct' element={<UploadProduct/>}/> 
      <Route path='/spregister' element={<SPRegistration/>}/> 
      <Route path='/custhome' element={<CustomerHome/>}/>
      <Route path='/servicehome' element={<ServiceproviderHome/>}/>
      <Route path='/searchservice' element={<SearchService/>}/>
      <Route path="/viewrequest" element={< ViewRequest/> } />
      <Route path='/custregister' element={<CustomerRegistration/>}/>
      <Route path='/buyproduct' element={<Order/>}/>
      <Route path='/setsolution' element={<Solution/>}/>
      <Route path='/validate' element={<Validation/>}/>
      <Route path='/wlginprdcts' element={<SearchProducts/>}/>
      <Route path='/help' element={<Call/>}/>
      <Route path='/getallusers' element={<Getallusers/>}/>
      <Route path='/aboutus' element={<Aboutus/>}/>
      <Route path='/help' element={<Help/>}/>
      <Route path='/rating' element={<Rating/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
