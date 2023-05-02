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
import { registerUser } from "backend";
import React, { useState } from "react";
import "../styles.css"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

function AddUser() {
  const [user, setUser] = useState({
    id : "",
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>{
      setUser((prev) => {
          return {
              ...prev,
              [e.target.name] : e.target.value
          };
      });
  };

  const UserRegister = (e) => {
  e.preventDefault();

  registerUser(user)
  .then((res) => {
      setUser({
          id : "",
          firstname: "",
          lastname: "",
          email: "",
          role: ""
      });
      console.log("User Added Successfully");
      setMsg("User Added Successfully");
  })
  .catch((error) => {
      console.log(error);
  });
  };
  return (
    <>
      <div className="containerUser">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                           <h3> Ajouter Utilisateur</h3>
                        </div>
                        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                        <div className="card-body">
                            <form onSubmit={(e) => UserRegister(e)}>
                                <div className="mb-3">
                                    <label>Entrer le NOM</label>
                                    <input type="text" name="firstname" className="form-control" onChange={(e) => handleChange(e)} value={user.firstname} />
                                </div>
                                <div className="mb-3">
                                    <label>Entrer le PRENOM</label>
                                    <input type="text" name="lastname" className="form-control" onChange={(e) => handleChange(e)} value={user.lastname} />
                                </div>
                                <div className="mb-3">
                                    <label>Entrer l'Email</label>
                                    <input type="email" name="email" className="form-control" onChange={(e) => handleChange(e)} value={user.email} />
                                </div>
                                <div className="mb-3">
                                    <label>Entrer le Role</label>
                                    <input type="text" name="role" className="form-control" onChange={(e) => handleChange(e)} value={user.role} />
                                </div>
                                <button className="btn btn-primary col-md-12">Ajouter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default AddUser;
