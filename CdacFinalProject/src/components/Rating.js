
import {useReducer,useEffect, useState, setOrder, setName, } from "react";
import { AxiosContext } from "react-axios/lib/components/AxiosProvider";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';

const init={
    pid:"",
    rating:"",
    comment:""
   
}
const reducer=(state,action)=>{
    switch(action.type){
        case 'update':
        return {...state,[action.field]:action.val}
       case 'clear':
         return init;
    }
  }
  function Rating(){
    let navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login")
    };
const[rate,setRate]=useReducer(reducer, init);
const[greet,setGreet]=useState("")
const[product,setProduct]=useState([]);
useEffect(()=>{
  getproduct();
 
},[]);
const getproduct=()=>{
axios
    .get("http://localhost:8080/getallproducts")
    .then((resp)=>{
            setProduct(resp.data);
            console.log(product);
    });

    

};
const sendData=(e)=>{
    e.preventDefault();
  
    console.log(rate.pid);
    const nm=(JSON.parse(localStorage.getItem("loggedincust")).userid);
    console.log(nm);
    
    const reqOptions1={
      method:"POST",
      headers:{
          'Content-Type':'application/JSON'
      },
      body:JSON.stringify({
        pid:rate.pid,
        ratinguserid:nm,
       rating:rate.rating,
       comment:rate.comment

      })
    }
    console.log(reqOptions1);
  
    fetch("http://localhost:8080/rateus",reqOptions1)
    .then(resp=>resp.json())
    .then(data=>{
      console.log(data);
      if(data!=null)
      {
              setGreet("Thank you for your valuable feedback");
      }
    
    })
  }
    return (
      <div>
<div style={{backgroundColor:'tan',height:'620px'}}>
<Navbar bg="dark" variant="dark">
<Navbar.Brand href="/home" style={{paddingLeft:'50px'}}>MobiJet</Navbar.Brand>
            <Nav className="mr-auto navbar_wrapper">

            </Nav>
       
            <Nav style={{paddingLeft:'1100px'}}>
            <NavDropdown title={(JSON.parse(localStorage.getItem("loggedincust"))).fname}>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
    </Navbar>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
      <div class="card form-card border-color" style={{ width: "25rem" }}>
        <div className="card-header bg-color">
          <h5 class="card-title">Rate Us</h5>
        </div>
        <div class="card-body">
      
      <div style={{ display: 'contents', alignItems: 'center' }}>
       
       
    <form >
    Select Product:
        <select name="pid" onChange= {(e)=>{setRate({type:'update',field:'pid',val:e.target.value})}}>
            <option value="">Select Product...</option>
        {product.map((e)=>(
            <option key={e.pid}  value={e.pid}  >
                {e.pid}</option>
        ))}
        </select>
        <br/>
  <label>Rate Here: </label>
    <input type="text" size={20} name="rating" value={rate.rating}  pattern="[1-5]{1}$" onChange={(e)=>{setRate({type:'update',field:'rating',val:e.target.value})}} />
    <br/>
    <label>Comment Here: </label>
    <input type="text" size={20} name="comment" value={rate.comment} onChange={(e)=>{setRate({type:'update',field:'comment',val:e.target.value})}} />
    <br/>
   
    <input type="submit" value="send" onClick={(e)=>{sendData(e)}}/>
    <input type="reset" value="clear" onClick={()=>{setRate({type:'clear'})}}/>
  </form>

{greet}
       
       </div>    
       </div>
       </div>
       </div>
     
       </div>    
       <Footer/>
       </div> 
     );
 }
 
 export default Rating;