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
import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../backend";
import "../styles.css"

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({
    id : "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const history = useHistory();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
      getUserById(id)
      .then((res) => {
          setUser(res.data);
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

  const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      })
  }

  const userUpdate = (e) => {
      e.preventDefault();
      
      updateUser(user)
        .then((res) => {
            history.push("/admin/user-page");
            console.log("user modifié");
        })
        .catch((error) => {
          console.log(error);
      });
  };


  return (
    <div className="editUser">
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">Modifier l'Utilisateur</div>

                        <div className="card-body">
                            <form onSubmit={(e) => userUpdate(e)}>
                                <div className="mb-3">
                                    <label>Entrer le NOM</label>
                                    <input
                                    type="text"
                                    name="firstname"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    value={user.firstname}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Entrer le PRENOM</label>
                                    <input
                                    type="text"
                                    name="lastname"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    value={user.lastname}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Entrer l'EMAIL</label>
                                    <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    value={user.email}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Entrer le ROLE</label>
                                    <input
                                    type="text"
                                    name="role"
                                    className="form-control"
                                    onChange={(e) => handleChange(e)}
                                    value={user.role}
                                    />
                                </div>
                                <button className="btn btn-primary col-md-12">Modifier</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditUser;
