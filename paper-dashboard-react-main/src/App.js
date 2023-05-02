import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import LoginLayout from "layouts/LoginLayout.js";

export default function App() {
    const isAuthenticated = localStorage.getItem('token');
    console.log(isAuthenticated);  
  
    return (
      <BrowserRouter >
        <Switch>
          {(isAuthenticated != null) ? (
            <>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Redirect to="/admin/dashboard" />
            </>
          ) : (
            <>
             <Route path="/login" render={(props) => <LoginLayout {...props}/>} />
              <Redirect to="/login/" />
            </>
          )}
    
        </Switch>
      </BrowserRouter>
    );
  }