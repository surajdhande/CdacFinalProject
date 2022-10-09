import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//import background from './image2.jpeg';
import axios from 'axios';
import Footer from './footer';
const init = {
pid:""

}

const reducer = (state, action) => {
  switch (action.type) {
      case 'update':
          return { ...state, [action.field]: action.val };
      case 'clear':
          return init;
  }
}

function SearchProduct() {
  let navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const logout = () => {
    localStorage.clear();
    navigate("/login")
  };
  const getpid=(pid)=>{

    console.log(pid) ;  
        
    axios
    .get("http://localhost:8080/getproductsbyid?pid="+pid)
    .then(resp=>{
      console.log(resp.data);
      localStorage.setItem("productinfo",JSON.stringify(resp.data));
      navigate("/buyproduct");
  });
 };
  const [user, setUser] = useState({});
  useEffect(() => {
    let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
    fetch("http://localhost:8080/getUser?uid=" + loginid)
      .then(resp => resp.json())
      .then(data => { setUser(data); localStorage.setItem("loggedincust", JSON.stringify(data)); let nm = data.fname });

      fetch("http://localhost:8080/getallproducts")
      .then(resp => resp.json())
      .then(data => setProduct(data))

    //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
  }, []);



  return (
    <div style={{backgroundColor:'tan',height:'620px'}}>
      
         <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">MobiJet</Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">

        <Nav style={{paddingLeft:'100px'}}><Link to="/rating">Rating</Link></Nav>

        </Nav>
        <Nav style={{paddingLeft:'950px'}}>
          <NavDropdown title={user.fname}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
  </Navbar>
 









 <div>
  <div style={{height:'550px'}} >
    
  <table align="center" >
   <h1>Products</h1>
  
    <tr>
    {product.map((e)=>{
            return( 
                
                  <td style={{paddingLeft:'-100px'}}> 
                  <br/>
                  <img src={`data:image/png;base64,${e.image}`} width="150" height="150"  /> <br/>
                    Name  :    {e.company} <br/>
                   Price  :        {e.price}  <br/>
                   Description  :        {e.description}  <br/>
                   <button key={e.pid} value={e.pid} onClick={(e)=>{getpid(e.target.value)}}>Buy Now</button>
                       </td>
                    
                
              
             
            )
     
       })}
       </tr>
        </table>
        </div>
     
        </div>
              <Footer/>
           </div>  
  );
}

export default SearchProduct;