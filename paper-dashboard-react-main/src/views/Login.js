/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { useState } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";
import "../styles.css"
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import { getUserByEmail } from "backend";

let username = "";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();
  let role = "";

  const getUser = () => {
    getUserByEmail(email).then((reponse) => {
      username =(reponse.data.firstname) + " " + (reponse.data.lastname);
      role = reponse.data.role;
      console.log(username);
    }).catch((error)=> console.log(error));
  }


  const login = async (event) => {
      event.preventDefault();
      getUser();
      try {
        await axios.post("http://localhost:8080/auth/token/authenticate", {
          email: email,
          password: password,
          }).then((res) => 
          {
            const token = res.data.token;
            localStorage.setItem('token',token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //console.log(axios.defaults.headers.common['Authorization']);  
            history.push("/admin/dashboard");
      

        }, fail => {
         console.error(fail); // Error!
         setMsg("Invalid Email or Password");
        });
      }
      catch (err) {
        alert(err);
        setMsg("Enter Email and Password");
      }
      // try {
      //   await axios.post("http://localhost:8080/auth/token/authenticate", {
      //     email: email,
      //     password: password,
      //     }).then((res) => 
      //     {
      //       localStorage.setItem("TOKEN", JSON.stringify(res.data.token))
      //       history.push("/admin/qrcodes");
      //       console.log(res.data);
      //   }, fail => {
      //    console.error(fail); // Error!
      //    setMsg("Invalid Email or Password");
      //   });
      // }
      // catch (err) {
      //   alert(err);
      //   setMsg("Enter Email and Password");
      // }
    
  }
 
  return (
    <div class="containerLogin">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">
              <h2 class="text-center">Login Form</h2>
            </div>
            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
            <div class="card-body">
              <form method="post" class="form-horizontal" onSubmit={login}>

                <div class="form-group mb-3">
                  <label class="control-label"> Email</label>
                  <input
                      type="text"
                      class="form-control"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="control-label"> Password</label>
                  <input
                      type="password"
                      class="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div class="form-group mb-3">
                  <button type="submit" class="btn btn-primary" >Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export {username}
export default Login;
