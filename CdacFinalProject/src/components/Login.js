import {useReducer, useState} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import React from "react";
import { useNavigate, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from './footer';
const init={
  emailid:"",
  userpassword:"",
 
}
const reducer=(state,action)=>{

    switch(action.type){
      case 'update':
return{...state,[action.field]:action.val};
    case 'clear':
      return init;
    }
    
  
}
let Login=()=>{
 // const[emailid,setEmailid]=useState("");
 const [login,dispatch]=useReducer(reducer,init);
 const [loginerror, setLoginerr] = useState("");
 let navigate = useNavigate();
 const sendData=(e)=>{
      
e.preventDefault();
console.log(JSON.stringify(login));
const reqOptions={
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    emailid:login.emailid,
    userpassword:login.userpassword
  })
  }
  fetch("http://localhost:8080/logincheck",reqOptions)
        .then(resp=>resp.json())
               .then(data=>{
                console.log(data);
                if(data!=null)
                {
                  if(data.role === "customer")
                  {
                    localStorage.setItem("loggedinuser",JSON.stringify(data));
                    navigate("/custhome");
                  }
                  else if(data.role==="service provider" && data.status===true)
                  {
                    localStorage.setItem("loggedinuser",JSON.stringify(data));
                    navigate("/servicehome");

                  }
                  else if(data.role==="admin")
                  {
                    localStorage.setItem("loggedinuser",JSON.stringify(data));
                    navigate("/getallusers");

                  }
                  else if(data.role==="service provider" && data.status===false)
                  {
                    alert("You are not valid Service Provider");
                  }
                 
                }
              
                
                
               })
               
       
 }
  return(
    <div>
    <div className="loginhome" align="center" style={{backgroundColor:'lightcyan',height:'600px'}}>
      <Navbar bg="dark" variant="dark">
        <Nav/>
        <Nav/>
        <Nav/>
        <Navbar.Brand href="/home"  style={{paddingLeft:'50px'}}><h3>MobiJet</h3></Navbar.Brand>
          <Nav className="mr-auto navbar_wrapper"  style={{paddingLeft:'1000px'}}>
            
          <div  >
        <ul className="nav bar">
    <li >
    <div className="nav-link">
   
    </div>
    </li>
    
    
   
  </ul>
    </div>
          </Nav>
          
      </Navbar>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
      <div class="card form-card border-color" style={{ width: "35rem",height:"25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Login Form</h5>
          </div>
      <form className='form'>
        <br/>
        <label for="title" class="form-label">Enter Email : -</label>
        <input type="text" name="emailid" required="true" value={login.emailid} onChange={(e)=>{dispatch({type:'update',field:'emailid',val:e.target.value})}} />
              
      <br/>
      <label for="title" class="form-label">Enter userpassword : -</label>
        <input type="password" name="userpassword" value={login.userpassword} onChange={(e)=>{dispatch({type:'update',field:'userpassword',val:e.target.value})}}  />
        <br/>
        <br/>
        
        <Button type="submit"  value="send" onClick={(e)=>{sendData(e)}}>Submit</Button>     <Button type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}>Clear</Button>
        <br/>
        <br/>
     
    
      </form>
      <p>If not registerd - Registerd as Customer  <Link to="/custregister">Register</Link></p>
                         <p> Registerd as Service Provider            <Link to="/spregister">Register</Link></p>
     {/*<p> {setLoginerr} </p>*/}
      
       </div>
       </div>
    </div>
    <Footer/>
    </div>
  )

}
export default Login;