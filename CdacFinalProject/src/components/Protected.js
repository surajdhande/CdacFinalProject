import {useReducer, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from './Header';
const init={
  emailid:"",
  userpassword:"",
 
}
const reducer=(state,action)=>{

    switch(action.type){
      case 'update':
return{...state,[action.field]:action.val};
    case 'clear':
      return init;
    }
    
  
}
let Login=()=>{
 // const[emailid,setEmailid]=useState("");
 const [login,dispatch]=useReducer(reducer,init);
 const [loginerror, setLoginerr] = useState("");
 let navigate = useNavigate();
 const sendData=(e)=>{
      
e.preventDefault();
console.log(JSON.stringify(login));
const reqOptions={
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    emailid:login.emailid,
    userpassword:login.userpassword
  })
  }
  fetch("http://localhost:8080/logincheck",reqOptions)
        .then(resp=>resp.json())
              
               .then(data=>{
                console.log(data);
                //const json=JSON.parse(data);
                /*if(data){
                  const json=JSON.parse(data);
                  console.log(json);
                  this.setState({customer:json})
                  localStorage.setItem("loggedinuser",JSON.stringify(json.customer));

                
                   
                }
                else{
                    this.setItem({loginerror:"Wrong ID/Password"})
                }*/
                  if(data!=null)
                  {
                    if(data.role === "customer")
                    {
                      localStorage.setItem("loggedinuser",JSON.stringify(data));
                      navigate("/custhome");
                    }
                    else if(data.role==="service provider")
                    {
                      localStorage.setItem("loggedinuser",JSON.stringify(data));
                      navigate("/servicehome");

                    }
                  }
                  else
                  {
                    setLoginerr("Wrong ID/Password");
                  }
               })
        {/*.then(resp=>resp.json())
              .then(data=> dispatch(data));*/}
 }
  return(
    <div align="centre">
      <Header/>
      <h1>Login Form</h1>
      <form>
        <label>Enter Email</label>
        <input type="text" name="emailid" value={login.emailid} onChange={(e)=>{dispatch({type:'update',field:'emailid',val:e.target.value})}} />
        <br/>
        <label>Enter userpassword</label>
        <input type="password" name="userpassword" value={login.userpassword} onChange={(e)=>{dispatch({type:'update',field:'userpassword',val:e.target.value})}}  />
        <br/>
        <Button type="submit" value="send" onClick={(e)=>{sendData(e)}}>Submit</Button>
        <Button type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}>reset</Button>
        {/*<input type="submit" value="send" onClick={(e)=>{sendData(e)}}/>
        <input type="reset" value="clear" onClick={()=>{dispatch({type:'clear'})}}/>*/}
      </form>

     <p> {setLoginerr} </p>
      
       
    </div>
    
  )

}
export default Login;