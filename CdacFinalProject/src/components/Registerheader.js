
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Registerheader() {
  let user= JSON.parse(localStorage.getItem('loggedinuser'))
  //console.warn(user);
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">MobiJet</Navbar.Brand>
        {/*<Nav className="mr-auto navbar_wrapper">
          {
            localStorage.getItem('loggedinuser') ?
              <>
                <Link to="/home">Home</Link>
              </>
              :
              <>
                {/*<Link to="/uploadproduct">Upload Product</Link>
                <Link to="/add">Add Product</Link>
              </>

          }
        </Nav>*/}
        
      </Navbar>
    </div>
  );
}
export default Registerheader