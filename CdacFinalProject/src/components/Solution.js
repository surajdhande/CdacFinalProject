
import {useReducer,useEffect, useState, setOrder, setName, } from "react";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
const init={
    remark:"",
    status:""
   
}
const reducer=(state,action)=>{
    switch(action.type){
        case 'update':
        return {...state,[action.field]:action.val}
       case 'clear':
         return init;
    }
  }




let Solution=()=>{
    let navigate = useNavigate();
    const [sol, dispatch] = useReducer(reducer, init);
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    };
    const[solreq,setSolreq]=useState({});
//const[sol,setSol]=useState([]);
    const sendData=(e)=>{
        e.preventDefault();
        const reqid=(JSON.parse(localStorage.getItem("customerrequest")));
        console.log(reqid);
        
        const nm=(JSON.parse(localStorage.getItem("loggedincust")).userid);
        console.log(nm);
        const name=(JSON.parse(localStorage.getItem("loggedincust")).fname);
        const reqOptions1={
          method:"POST",
          headers:{
              'Content-Type':'application/JSON'
          },
          body:JSON.stringify({
            reqid:reqid,
            userid:nm,
            remark:sol.remark,
            status:sol.status
       
    
          })
        }
        fetch("http://localhost:8080/savesolution",reqOptions1)
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data);
          if(data!=null)
          {
                  setSolreq("SOlution updated");
          }
        
        })
      }
    


    return (
      <div>
      <div style={{backgroundColor:'blanchedalmond',height:'600px'}}>
         <Navbar bg="dark" variant="dark">
         <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}><h3>MobiJet</h3></Navbar.Brand>
       <Nav className="mr-auto navbar_wrapper">

         localStorage.getItem("loggedinuser")
             <>
   
         </>


       </Nav>
       <Nav style={{paddingLeft:'900px'}}>
         <NavDropdown >
           <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
         </NavDropdown>
       </Nav>
     </Navbar>
    
    <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Solution </h5>
          </div>
          <div class="card-body">
        
        <div style={{ display: 'contents', alignItems: 'center' }}>
    
    <form >
    <label>Enter Remark Here: </label>
    <input type="text" size={20} name="remark" value={sol.remark} onChange={(e)=>{dispatch({type:'update',field:'remark',val:e.target.value})}} />
    <br/>
    <br/>
    <label>Enter Status: </label>
    <input type="text" size={20} name="status" value={sol.status} onChange={(e)=>{dispatch({type:'update',field:'status',val:e.target.value})}} />
    <br/>
    <br/>
   
    <Button type="submit" value="send" onClick={(e)=>{sendData(e)}}>Submit</Button>    <Button type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}>Clear</Button>
    
  </form>

  
 
                </div>
                </div>
                </div>
                </div>
                </div>
                <Footer/>
                </div>
    
     );
 }
 
 export default Solution;