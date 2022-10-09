import { useReducer, useState,useEffect } from "react";
import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom';

const CustomerRegistration = () => {
  const [user, setUser] = useState({
    useremail: "",
    userpassword: "",
    role: "customer",
    status: "true",
    fname: "",
    lname: "",
    emailid: "",
    contactno: "",
    address: "",
    areaid:0,
  });

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = () => {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  const[city,setCity]=useState([]);
  const[area,setArea]=useState([]);
  //const history=useHistory();
  useEffect(()=>{
      getcity();
    },[]);







  const getcity=()=>{
    axios
    .get("http://localhost:8080/allcities")
    .then((res)=>{
        setCity(res.data);
        //console.log(city);
    });
    
};

const getarea=(id)=>{

console.log(id) ;  
    
axios
.get("http://localhost:8080/getareabyid?cityid="+id)
.then((res)=>{
   setArea(res.data);
    console.log(area);
});
};


  return (
    <div style={{backgroundColor:"lightgrey"}}>
    <Navbar bg="dark" variant="dark">
     <Navbar.Brand href="/home">MobiJet</Navbar.Brand>
     <Nav className="mr-auto navbar_wrapper">
       
     <div  >
   <ul className="nav bar">
<li >
<div className="nav-link">
<Link to="/">Home</Link>
</div>
</li>




</ul>
</div>
     </Nav>
     </Navbar>
       <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div class="card form-card border-color" style={{ width: "40rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Customer Registration Form</h5>
          </div>
          <div class="card-body">
          <form>
            <table>
              <div class="mb-3">
                <tr>
                <td><label for="title" class="form-label">
                  First Name * : -
                </label></td>
               <td style={{paddingLeft:'90px'}}> <input
                  type="text"
                  class="form-control"
                  id="fname"
                  name="fname"
                  pattern="[A-Za-z]{3,}"
                  onChange={handleUserInput}
                  value={user.fname}
                  placeholder="Enter First Name"
                  required="true"
                 style={{width:"350px"}}
                /></td>
                </tr>
              </div>
              <div class="mb-3">
                <tr>
                  <td>
                <label for="description" class="form-label">
                  Last Name * : -
                </label> </td>
                <td style={{paddingLeft:'90px'}}>               
                <input
                  type="text"
                  class="form-control"
                  id="lname"
                  name="lname"
                  pattern="[A-Za-z]{3,}"
                  onChange={handleUserInput}
                  value={user.lname}
                  placeholder="Enter Last Name"
                  required="true"
                  style={{width:"350px"}}
                />
                 </td>
                </tr>
              </div>

              <div className="mb-3">
                <tr><td>
                <label className="form-label">Enter Emailid * : -</label>     </td>    
                <td style={{paddingLeft:'75px'}}>
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  name="useremail"
                  onChange={handleUserInput}
                  value={user.useremail}
                  placeholder="Enter valid Email Address"
                  required="true"
                  style={{width:"350px"}}
                /></td>
                </tr>
              </div>

              <div class="mb-3 mt-1">
                <tr><td>
                <label for="quantity" class="form-label">
               Password * : -
                </label>     </td>
                <td style={{paddingLeft:'100px'}}>   
                <input
                  type="password"
                  class="form-control"
                  id="userpassword"
                  name="userpassword"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  onChange={handleUserInput}
                  value={user.userpassword}
                  placeholder="eg.Shubham@1999"
                  required="true"
                  style={{width:"350px"}}
                /></td></tr>
          
              </div>

              <div class="mb-3">
                <tr><td>
                <label for="price" class="form-label">
                  Mobile No * : -
                </label>   </td>     
                <td style={{paddingLeft:'90px'}}>
                <input
                  type="number"
                  class="form-control"
                  id="contactno"
                  name="contactno"
                  pattern="/^[0-9]{10}$/"
                maxLength={10}
                  onChange={handleUserInput}
                  value={user.contactno}
                  placeholder="Enter  10 digit Mobile Number"
                  required="true"
                  style={{width:"350px"}}
                 
                />
                </td></tr>
              </div>
              <div class="mb-3">
                <tr><td>
                <label for="description" class="form-label">
                  Enter Alternate Emailid : -
                </label> </td>
                <td style={{paddingLeft:'20px'}}>     
                <input
                  type="email"
                  class="form-control"
                  id="emailid"
                  name="emailid"
                  onChange={handleUserInput}
                  placeholder="Enter alternate Emailid"
                  value={user.emailid}
                  style={{width:"300px"}}
                />
                </td></tr>
              </div>
             
              <div>
                    Select city:           *
                    <select name="city" onChange={(e) => { getarea(e.target.value) }} required="true">
                        <option value="">Select city...</option>
                        {city.map((city) => (
                            <option key={city.cityid} value={city.cityid}  >
                                {city.cityname}</option>
                        ))}
                        {/*  onChange={(e)=>{dispatch({type:'update',field:'cityid',val:e.target.value}),getarea((e)=>{} </select>}}  */}
                    </select>
                </div>

                <div>
                    Select Area:         *
                    <select name="areaid"   onChange={handleUserInput}
                  value={user.areaid} required="true">
                        <option value="">Select Area...</option>
                        {area.map((area) => (
                            <option key={area.areaid} value={area.areaid}>
                                {area.areaname}
                            </option>
                        ))
                        }
                    </select>
                </div>
                <br/>



              <div class="mb-3">
                <tr>
                <td>

              
                <label for="price" class="form-label">
                  Address * : -
                </label></td>
                <td style={{paddingLeft:'110px'}}>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter Plot No/Lane No"
                  onChange={handleUserInput}
                  value={user.address}
                  required="true"
                  style={{width:"300px"}}
                />
                  </td>
                </tr>
              </div>

             
              <Button
                type="submit"
                class="btn-primary"
                onClick={saveUser}
              >
                Register
              </Button>
              </table>
            </form>
            <br/>
            <h5>If already registered-<Link to="/Login">Login</Link></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
