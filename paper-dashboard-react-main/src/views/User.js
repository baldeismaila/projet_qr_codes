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
import { Link, NavLink } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import{getAllUsers, deleteUser, lockUser, unlockUser} from "../backend";
import "../styles.css"


function User() {
  const [usersList, setUserList] = useState([]);
  const [msg, setMsg] = useState("");

  const getListUsers = () => {
    getAllUsers().then((reponse) => setUserList(reponse)).catch((error)=> console.log(error));
  }

  const userDelete = (email) => {
      deleteUser(email)
      .then((res) => {
        setMsg("Delete Sucessfully");
        getListUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLock = (email) => {
    lockUser(email)
    .then((res) => {
      getListUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const userUnlock = (email) => {
    unlockUser(email)
    .then((res) => {
      getListUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };



  useEffect(() => {
     getListUsers();
  },[]);
    
  return (
    <div className="user">
      <div className="container mt-3">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div>
                      <NavLink to={'/admin/addUser/'} className="btn btn-sm btn-primary">AJOUTER UTILISATEUR</NavLink>
                    </div>
                    <div className="card-header fs-3 text-center">
                        <h2> Liste des Utilisateurs</h2>
                        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                    </div>

                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map((user) => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                          {user.active && <p>Non bloquer</p>}
                                          {!(user.active) && <p>Bloquer</p>}
                                        </td>
                                        <td>
                                          <Link to={'editUser/'+user.id} className="btn btn-sm btn-primary">Modifier</Link>
                                          <button onClick={() => userDelete(user.email)} className="black btn btn-sm btn-danger ms-1">
                                            Supprimer
                                          </button>
                                         
                                            {user.active &&
                                              <button onClick={() => userLock(user.email)} className="btn btn-sm btn-danger ms-1">
                                              Bloquer
                                            </button>
                                            }
                                            {!(user.active) &&
                                              <button onClick={() => userUnlock(user.email)} className="btn btn-sm btn-danger ms-1">
                                              Debloquer
                                            </button>
                                            }

                                          <Link to={'editRole/'+user.email} className="black btn btn-sm btn-primary">Role</Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default User;
