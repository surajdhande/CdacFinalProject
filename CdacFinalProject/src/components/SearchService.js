import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
//import background from './image1.jpg'
import e from 'cors';
import { Component, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import {useReducer, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
const init={
    company:"",
    model:"",
    pstatement:"",
    type:"",
    date:"",
    
}
const reducer=(state,action)=>{
    switch(action.type){
        case 'update':
        return {...state,[action.field]:action.val}
       case 'clear':
         return init;
    }
}
let SearchService=()=>{

    let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login")
  };

  const [users, setUsers] = useState({});
  useEffect(() => {
    let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
    fetch("http://localhost:8080/getUser?uid=" + loginid)
      .then(resp => resp.json())
      .then(data => { setUsers(data); localStorage.setItem("loggedincust", JSON.stringify(data)); let nm = data.fname });
    
  }, []);


    const[user,dispatch]=useReducer(reducer,init);
 const nm=(JSON.parse(localStorage.getItem("loggedincust")).userid);
 console.log(nm);
    const sendData=(e)=>{
        e.preventDefault();
        console.log(JSON.stringify(user));
        const reqOptions={
            method:"POST",
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({
                userid:nm,
                company:user.company,
                model:user.model,
                pstatement:user.pstatement,
                type:user.type,
                date:user.date
             })
        }
        fetch("http://localhost:8080/saverequest",reqOptions)
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data);
            if(data){
                localStorage.setItem("loggedinuser",JSON.stringify(data))
            }
            else{
                this.setItem({loginerror:"Wrong Information added"})
            }
        })
       
    }


    
    return (
        <div style={{backgroundColor:'tan',height:'650px'}}>
             <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}>MobiJet</Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">

          localStorage.getItem("loggedinuser")
              <>
    
          </>


        </Nav>
        <Nav style={{paddingLeft:'950px'}}>
          <NavDropdown title={users.fname}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <div   style={{
                //backgroundImage: `url(${background})`,
                // backgroundImage: `url(${externalImage})`,
              //backgroundSize: 'center',
                backgroundRepeat: 'repeat',
                //backgroundPosition: 'center',
               height: '550px',
               // width:'3000px'
                //opacity:0.8
              }}>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
      <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Service Request form</h5>
          </div>
      <form >
      <label for="title" class="form-label">Enter Product Company: </label>
        <input type="text" size={20} name="company" value={user.company} onChange={(e)=>{dispatch({type:'update',field:'company',val:e.target.value})}} />
        <br/>
        <label for="title" class="form-label">Enter Product Model:</label>
        <input type="text"  name="model" value={user.model} onChange={(e)=>{dispatch({type:'update',field:'model',val:e.target.value})}}  />
        <br/>
        <label for="title" class="form-label">Enter Problem Here: </label>
        <input type="text" name="pstatement" value={user.pstatement} onChange={(e)=>{dispatch({type:'update',field:'pstatement',val:e.target.value})}} />
        <br/>
        <label for="title" class="form-label">Enter Type: </label>
        <input type="text" name="type" value={user.type} onChange={(e)=>{dispatch({type:'update',field:'type',val:e.target.value})}} />
        <br/>
        
        <label for="title" class="form-label">Enter Date : </label>
        <input type="date" name="type" value={user.date} onChange={(e)=>{dispatch({type:'update',field:'date',val:e.target.value})}}   />
        <br/>
       
        <Button type="submit" value="send" onClick={(e)=>{sendData(e)}}>Send</Button>    <Button type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}>Clear</Button>
       <br/>
       <br/>
      </form>

      {/*JSON.stringify(user)*/}
    </div>
    </div>
    </div>
    <Footer/>
   </div>
        );
 }
 
 export default SearchService