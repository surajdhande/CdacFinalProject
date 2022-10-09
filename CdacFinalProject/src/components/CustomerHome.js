import Header from './Header';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
function CustomerHome() {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login")
  };
  const [user, setUser] = useState({});


  useEffect(() => {
    let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
    fetch("http://localhost:8080/getUser?uid=" + loginid)
      .then(resp => resp.json())
      .then(data => { setUser(data); localStorage.setItem("loggedincust", JSON.stringify(data)); let nm = data.fname });
    //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
  }, []);


  //let nm = localStorage.getItem('loggedinsp')

  return (
    <div style={{backgroundColor:'tan',height:'600px'}}>
    <div style={{backgroundColor:'tan',height:'600px'}}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}><h3>MobiJet</h3></Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">
        </Nav>
       
        <Nav style={{paddingLeft:'1100px'}}>
          <NavDropdown title={user.fname} >
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
       
      </Navbar>
      
      <h1>Welcome {user.fname}</h1>
<table>
<tr>
  <td style={{paddingLeft:'200px'}}><Link to="/searchproduct" aria-setsize='20'>Search for Products</Link></td>
      <br />
    <td style={{paddingLeft:'800px'}}>  <Link to="/searchservice">Raise Request</Link></td>
      </tr>


</table>
      
   
    </div>
    <Footer/>
    </div>
  );
}

export default CustomerHome;