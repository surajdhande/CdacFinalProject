import { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from './Header';
import iphone from './iphoneSE128gb.png'
import i1 from './home.jpeg'
import i2 from './iphoneSE128gb.png'
import tenprmx from './redminote10prmx.jpg'
import Footer from './footer';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
//import images from './Image'
//import { Navigate } from 'react-router-dom';
//import background from './image3.jpg'
import './slide.css';  



function Home(){
  

    return(<div style={{backgroundColor:'whitesmoke'}}>
    
        
            <Header/>
            

         <table>
          <tr>
            <td>
                <img src={i1} height="550px" ></img>
            </td>
            <td>
              
            <img src={i2} height="250px" ></img>
            <br/>
            <Link to='/wlginprdcts'><h6>128 GB ROM<br/>
11.94 cm (4.7 inch) Retina HD Display<br/>
12MP Rear Camera | 7MP Front Camera<br/>
Wireless charging (Works with Qi Chargers | Qi Chargers are Sold Separately</h6></Link>
            </td>
          </tr>
         </table>
           
             

              
      




<Footer/>
       </div>
    )
}
export default Home;