import axios from "axios";
import Footer from './footer';
import { useReducer, useEffect, useState, setUser, setName } from "react";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const init = {
    price: "",
    company: "",
    model: "",
    description: ""
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, [action.field]: action.val };
        case 'clear':
            return init;

    }
}


let UploadProduct = () => {

    const [product, dispatch] = useReducer(reducer, init);
    const [img,setImg] = useState();
    const[user,SetUser]=useState({});
    const[pid,setPid]=useState(0);
    const[users,SetUsers]=useState([]);

    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    };
  
    useEffect(() => {
        /*let loginid = (JSON.parse(localStorage.getItem("loggedinuser"))).uid;
        fetch("http://localhost:8080/getUser?uid=" + loginid)
            .then(resp => resp.json())
            .then(data => { setUser(data);localStorage.setItem("loggedincust", JSON.stringify(data));  });
        //let nm= (JSON.parse(localStorage.getItem("loggedincust"))).fname;
        console.log(JSON.stringify(user))*/
    }, []);


    const sendData = (e) => {
        e.preventDefault();
       //console.log(JSON.stringify(product));
        const reqOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                userid:JSON.parse(localStorage.getItem("loggedincust")).userid,
                price: product.price,
                company: product.company,
                model: product.model,
                description: product.description

            })
        }


        var fd = new FormData();
        fd.append("file",img)
        const imgData={
            method: "post",
            Headers:{
                "content-type":"multipart/form-data"
            },
            body:fd
        }

       fetch("http://localhost:8080/saveproduct",reqOptions)
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data);
            setPid(data.pid);
            console.log(pid);

            fetch("http://localhost:8080/uploadimage/"+data.pid,imgData)
            .then(resp => resp.json())
            .then(data => console.log(data));
           
        })

    }

    return (
    <div>
        <div style={{backgroundColor:'blanchedalmond',height:'600px'}}>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home" style={{paddingLeft:'50px'}}>MobiJet</Navbar.Brand>
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
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Upload Product Information</h5>
          </div>
          <div class="card-body">
        
        <div style={{ display: 'contents', alignItems: 'center' }}>
            <h1></h1>
            <form >
            <label for="title" class="form-label">Enter Product Price: </label>
        <input type="number" name="price" value={product.price} onChange={(e)=>{dispatch({type:'update',field:'price',val:e.target.value})}} />
        <br/>
        <label for="title" class="form-label">Enter Product Company: </label>
        <input type="text"  name="company" value={product.company} onChange={(e)=>{dispatch({type:'update',field:'company',val:e.target.value})}}  />
        <br/>
        <label for="title" class="form-label">Product Model Name : </label>
        <input type="text" name="model" value={product.model} onChange={(e)=>{dispatch({type:'update',field:'model',val:e.target.value})}} />
        <br/>
        <label for="title" class="form-label">product Description: </label>
        <input type="text" name="description" value={product.description} onChange={(e)=>{dispatch({type:'update',field:'description',val:e.target.value})}} />
        <br/>
        <label for="title" class="form-label">Upload Image: </label>    
        <input type="file" name="img" onChange={(e)=>{console.log(((e.target.files[0])));setImg(e.target.files[0])} }/> <br/>

        <input type="submit" value="send" onClick={(e)=>{sendData(e)}}/>
        <input type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}/>
      </form>

            </div>
            </div>
            </div>

        </div>
    </div>
    <Footer/>
    </div>
    );
}

export default UploadProduct;