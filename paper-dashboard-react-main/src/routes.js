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
import Dashboard from "views/Dashboard.js";

import UserPage from "views/User.js";
import AddUser from "views/AddUser";
import EditUser from "views/EditUser";
import EditRole from "views/EditRole";

var routes = [
  {
    path: "/dashboard",
    name: "Generation Qr",
    icon: "fas fa-qrcode",
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/user-page",
    name: "Utilisateurs",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },

  {
    path: "/addUser",
    //name: "Ajouter utilisateur",
    //icon: "nc-icon nc-spaceship",
    component: AddUser,
    layout: "/admin"
  },

  {
    path: "/editUser/:id",
    //name: "Modifier utilisateur",
    //icon: "nc-icon nc-spaceship",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/editRole/:email",
    //name: "Modifier utilisateur",
    //icon: "nc-icon nc-spaceship",
    component: EditRole,
    layout: "/admin"
  },

];
export default routes;
