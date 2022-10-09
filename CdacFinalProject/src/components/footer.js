import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function footer() {
  let user= JSON.parse(localStorage.getItem('loggedinuser'))
  //console.warn(user);
  
  return (
    <div>
      
<Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home"></Navbar.Brand>
        <Nav className="mr-auto navbar_wrapper">
         
                <Link to="/aboutus">About us</Link>
                <Link to="/login">Help</Link>
                <Link to="/login">Search Service </Link>
             
        </Nav>
       {/*} <Nav>
          <NavDropdown title="Username">
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
  </Nav>*/}
      </Navbar>

    </div>
  );
}
export default footer;