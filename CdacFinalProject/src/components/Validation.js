import { useReducer, useState,useEffect } from "react";
import { getDefaultNormalizer } from '@testing-library/react';
import axios from 'axios';

const Validation = () => {
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
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 class="card-title">Registration form</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fname"
                  name="fname"
                  pattern="[A-Za-z]{3}"
                  onChange={handleUserInput}
                  value={user.fname}
                  placeholder="enter ur fname"
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lname"
                  name="lname"
                  pattern="[A-Za-z]{3}"
                  onChange={handleUserInput}
                  value={user.lname}
                  placeholder="enter ur lname"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Enter useremail</label>
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  name="useremail"
                  onChange={handleUserInput}
                  value={user.useremail}
                />
              </div>

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  user Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="userpassword"
                  name="userpassword"
                  pattern="[A-Za-z]{3}"
                  onChange={handleUserInput}
                  value={user.userpassword}
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  Mobile No
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="contactno"
                  name="contactno"
                  pattern="/^[0-9]{10,10}$/"
                  onChange={handleUserInput}
                  value={user.contactno}
                  placeholder="enter ur 10 digit mobile no"
                 
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Enter ur alternate email
                </label>       *
                <input
                  type="email"
                  class="form-control"
                  id="emailid"
                  name="emailid"
                  onChange={handleUserInput}
                  value={user.emailid}
                />
              </div>
             
              <div>
                    Select city:
                    <select name="city" onChange={(e) => { getarea(e.target.value) }}>
                        <option value="">Select city...</option>
                        {city.map((city) => (
                            <option key={city.cityid} value={city.cityid}  >
                                {city.cityname}</option>
                        ))}
                        {/*  onChange={(e)=>{dispatch({type:'update',field:'cityid',val:e.target.value}),getarea((e)=>{} </select>}}  */}
                    </select>
                </div>

                <div>
                    Select Area:
                    <select name="areaid"   onChange={handleUserInput}
                  value={user.areaid}>
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
                <label for="price" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  onChange={handleUserInput}
                  value={user.address}
                />
              </div>

             
              <button
                type="submit"
                class="btn custom-bg text-color"
                onClick={saveUser}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
