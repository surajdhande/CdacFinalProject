import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
//import background from './image2.jpeg';



function SearchProducts() {
  let navigate = useNavigate();

  const [product, setProduct] = useState([]);

  
  
  useEffect(() => {
    
      fetch("http://localhost:8080/getallproducts")
      .then(resp => resp.json())
      .then(data => setProduct(data))

    //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
  }, []);



  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Nav style={{paddingLeft:'50px'}}>
          
          <Navbar.Brand href="/home"><h3>MobiJet</h3></Navbar.Brand>
    </Nav>
        
  </Navbar>
 









 <div style={{backgroundColor:'lightcyan',height:"600px"}}>
  <div  >
    
  <table align="center" >
   <h1>Products</h1>
  
    <tr>
      <td>
    {product.map((e)=>{
            return( 
                
                  <td style={{paddingLeft:'100px'}}> 
                  <br/>
                  <img src={`data:image/png;base64,${e.image}`} width="150" height="150"  /> <br/>
                    Name  :    {e.company} <br/>
                   Price  :        {e.price}  <br/>
                   <Link to="/login" > Buy now</Link>
                       </td>
                    
                
              
             
            )
     
       })}
       </td>
       </tr>
        </table>
        </div>
  
        </div>
        <Footer/>
           </div>  
  );
}

export default SearchProducts;