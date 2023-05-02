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
import { addRole } from "backend";
import React, { useState } from "react";
import {  useHistory, useParams } from "react-router-dom";
import "../styles.css"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

function EditRole() {
  const [role, setRole] = useState();
  const history = useHistory();

  const { email } = useParams();
  console.log(email);

  const updateRole = () => {    
    addRole(email,role)
      .then((res) => {
        history.push("/admin/user-page");
        console.log("role modifié");
      })
      .catch((error) => {
        console.log(error);
    });
};

  return (
    <>
      <div className="content">
        <table className="tableRole">
          <tr>
            <td>
              <label>Email:</label>
            </td>
            <td>
                <input type="text" name="email" className="form-control" disabled value={email} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Role:</label>
            </td>
            <td>
                {/*  <input type="text" name="height" className="form-control" value={role}
                    onChange={(evt) => setRole(evt.target.value)} />
                </td>*/} 
              <select value={role} onChange={(evt) => setRole(evt.target.value)}>
                <option>--Choisi un role--</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>            
              </select>           
            </td>
          </tr>
          <tr>
            <td colspan="2">
            <button className="btn btn-sm btn-primary" onClick={updateRole}>Modifier</button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default EditRole;
