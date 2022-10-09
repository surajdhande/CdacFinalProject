import { useEffect,useState} from "react";
import Header from './Header';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
function ServiceproviderHome(){
  let navigate = useNavigate();

  const logout=()=>{
      localStorage.clear();
       navigate("/login")
  };
  const [user,setUser] = useState({});


  useEffect( ()=> {
    let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
    fetch("http://localhost:8080/getUser?uid="+loginid)
    .then(resp => resp.json())
    .then(data => {setUser(data); localStorage.setItem("loggedincust",JSON.stringify(data)); let nm = data.fname});
    //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
  }, []);

  useEffect(()=>{
     let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
     console.log(loginid)

     fetch("http://localhost:8080/getUser?uid="+loginid)
     .then(resp => resp.json())
     .then(data => {setUser(data); localStorage.setItem("loggedinsp",JSON.stringify(user))});


  },[]);


    return (<div>
       <div style={{backgroundColor:'blanchedalmond',height:'600px'}}>
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
       <br/>
        <h1>Welcome {user.fname}</h1>
       
       <Link to="/viewrequest">View Request</Link>
       <br/>
       <Link to="/uploadproduct">Upload Product</Link>
       
       </div>    
       <Footer/>
       </div>     
     );
 }
 
 export default ServiceproviderHome;