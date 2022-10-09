
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { hover } from '@testing-library/user-event/dist/hover'
function Header() {
  let user= JSON.parse(localStorage.getItem('loggedinuser'))
  //console.warn(user);
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav style={{paddingLeft:'50px'}}>
          
        <Navbar.Brand href="/home"><h3>MobiJet</h3></Navbar.Brand>
  </Nav>
        <Nav className="mr-auto navbar_wrapper">
         
                <Link   to="/login"><h6  hover="#00C49F">Login</h6></Link>
                <Link to="/wlginprdcts"> <h6  hover="#00C49F">Search</h6></Link>
                <Link to="/login"> <h6  hover="#00C49F">Service</h6></Link>
             
        </Nav>
        
      </Navbar>
    </div>
  );
}
export default Header;