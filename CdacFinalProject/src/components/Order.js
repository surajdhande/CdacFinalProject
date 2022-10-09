
import {useReducer,useEffect, useState, setOrder, setName, } from "react";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import Footer from './footer';

const init={
    paymentmode:"",
    status:"",
    date:""
   
}
const reducer=(state,action)=>{
  switch(action.type){
      case 'update':
      return {...state,[action.field]:action.val}
     case 'clear':
       return init;
  }
}

let Order=()=>{

    let navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login")
    };

    const[delivry,setDelivery]=useState("");
    const [user, setUser] = useState({});
    useEffect(() => {
        let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
        fetch("http://localhost:8080/getUser?uid=" + loginid)
            .then(resp => resp.json())
            .then(data => {
                setUser(data); localStorage.setItem("loggedincust", JSON.stringify(data));
                let nm = data.fname
            });
        //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
    }, []);
    /*
    const date = new Date();
    date.setDate(current.getDate()+7);
    const date1=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    setDelivery(date1); 
*/

    const[orders,dispatch]=useReducer(reducer,init);

    const sendData=(e)=>{
        e.preventDefault();
        const current = new Date();
       //const deliverydate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
     //  current.setDate(current.getDate()+7);
       //console.log(current.toDateString());
       //console.log((current));
        const nm=(JSON.parse(localStorage.getItem("loggedincust")).userid);
        console.log(nm);
        const pr=(JSON.parse(localStorage.getItem("productinfo")).pid);
        console.log(pr);
        const reqOptions1={
          method:"POST",
          headers:{
              'Content-Type':'application/JSON'
          },
          body:JSON.stringify({
            userid:nm,
            paymentmode:orders.paymentmode,
            status:"confirmed",
            orderdate:current,
            pid:pr
       
    
          })
        }
        fetch("http://localhost:8080/placeorder",reqOptions1)
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data);
          if(data!=null)
          {
            const date = new Date();
            date.setDate(current.getDate()+7);
            const date1=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            setDelivery(date1);       
          }
        
        })
      }
    

 

    return (<div>
        <div style={{backgroundColor:'tan',height:'600px'}}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}>MobiJet</Navbar.Brand>
                <Nav className="mr-auto navbar_wrapper">

                </Nav>
                <Nav style={{paddingLeft:'1150px'}}>
                    <NavDropdown title={user.fname}>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>


            <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Confirm Your Order</h5>
          </div>
          <div class="card-body">



        <form >
        <label for="description" class="form-label">Enter Payment Mode: </label>
        <input type="text" size={20} name="paymentmode" value={orders.paymentmode} onChange={(e)=>{dispatch({type:'update',field:'paymentmode',val:e.target.value})}} />
        <br/>
        <label for="description" class="form-label">Expected Delivery Date  </label> <label>{JSON.stringify(delivry)}</label>
       <br/>
        <Button type="submit" value="send" onClick={(e)=>{sendData(e)}} > Send </Button>             <Button type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}> Clear</Button>

      </form>

      

                    </div>
                    </div>
                  
                    </div>
                    </div>
                   
 <Footer/>
 </div>
    )
}
export default Order