import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Aboutus(){
    return(
    <div>
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
    <div className="container">
        <div className="py-4">
        <br/>
        <h2>About Us</h2>
        <p>
          <strong>
          The second-hand smartphone market in the country is expected to double in three years to 
          USD 4.6 billion by 2025, according to a joint report by mobile devices industry body ICEA and 
          research firm IDC.

          Consumers traded 25 million smartphones in the second-hand market generating a revenue of over 
          USD 2.3 billion, at an average price of USD 94 or Rs 6,900 per device, according to the report.
          India should be the global hub of re-manufacturing and re-commerce by leveraging its delta of labour cost. 
          Re-commerce's profound growth will effectively reduce the digital divide by enabling migration from feature 
          phones to smartphones.The Business Standard report estimates that 78 per cent of the users buying a second-hand smartphone 
          have a monthly income of less than Rs 30,000 and 18 per cent have a monthly income of Rs 30,000-Rs 50,000. 
          It makes the affordable price range a key factor in driving the demand for second-hand smartphones.
          </strong>
        </p>
        <p>
        The purpose of on-line mobile sale purchase system is to take online test of sale purchase of mobiles 
        in an efficient manner and no time wasting for selling and purchasing the mobiles. The main objective of on-line
        mobile sale purchase system simulator is to efficiently evaluate the candidate thoroughly through a fully 
        automated system that not only saves lot of time but also gives fast results.

        For seller they give his full support according to their convenience and time and there is no need 
        of using extra thing.
        </p>
        <marquee width="60%" direction="right" height="50px">
        <p>
          <h4>Mentor - KNOW-IT</h4><br/>
          {/*<img src={background}/>*/}
        </p>
        </marquee>
        {/*<marquee width="60%" direction="up" height="300px"> </marquee>*/}
      <b>
        <p>Member 1 - Suraj Gavli</p> 
        <p>Member 2 - Suraj Dhande</p>
        <p>Member 3 - Shubham Tiware</p>
        <p>Member 4 - Nikhil Tikekar</p>
       
        </b>
       
        
      </div>
    </div>
    </div>
    )
}
export default Aboutus;