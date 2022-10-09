import { useEffect,useState } from "react";
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import Footer from './footer';
function ViewRequest(){

  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login")
  };
  const getrequest=(request)=>{
    localStorage.setItem("customerrequest",JSON.stringify(request));
    console.log(request);
    navigate("/setsolution");
  }
  const [user, setUser] = useState({});
  useEffect(() => {
    let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
    fetch("http://localhost:8080/getUser?uid=" + loginid)
      .then(resp => resp.json())
      .then(data => { setUser(data); localStorage.setItem("loggedincust", JSON.stringify(data)); let nm = data.fname });
    
  }, []);
    const[request,setRequest]=useState([]);
    
  useEffect(()=>{
   const areaid=((JSON.parse(localStorage.getItem("loggedincust")).areaid).areaid);
   console.log(areaid);

    axios
    .get("http://localhost:8080/getrequestbyareaid?areaid="+areaid)
.then((res)=>{
  setRequest(res.data);
  
      });

  },[])




    return (<div>
      <div style={{backgroundColor:'blanchedalmond',height:'600px'}}>
         <Navbar bg="dark" variant="dark">
         <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}><h3>MobiJet</h3></Navbar.Brand>
       <Nav className="mr-auto navbar_wrapper">

         localStorage.getItem("loggedinuser")
             <>
   
         </>


       </Nav>
       <Nav style={{paddingLeft:'900px'}}>
         <NavDropdown title={user.fname}>
           <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
         </NavDropdown>
       </Nav>
     </Navbar>


     <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div class="card form-card border-color" style={{ width: "60rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Mobijet Customer Requests</h5>
          </div>
          <div class="card-body">




        <table  >
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Statement</th>
          </tr>
      
       {request.map((e)=>{
            return( 
         
                <tr >
                  <td width={100}>{e.reqid}</td>
                   <td width={200}>{e.company}</td>
                  <td width={200}>{e.model}</td>
                   <td width={200}>{e.pstatement} </td>
                  
                  <td>  <button key={e.reqid} value={e.reqid} onClick={(e)=>{getrequest(e.target.value)}}>Enter Solution</button></td>

                </tr>
             
            )
     
       })}
      
        </table>
       </div>
       </div>
       </div>
       </div>    
       <Footer/>   
       </div>  
     );
 }
 
 export default ViewRequest;