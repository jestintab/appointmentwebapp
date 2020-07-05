import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';

import { ProtectedRoute } from "./protected.route";


import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Login from './components/login.component';
import Dashboard from './components/dashboard.component';
import Provider from './components/provider.component';

function App() {
  return (
    <Router> 
      <Navbar />
      <div className="container">
      <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/dashboard"  component={Dashboard}/>
      <ProtectedRoute path="/users/"  component = {CreateUser}/>
      <ProtectedRoute path="/provider/"  component = {Provider}/>
      <Route path="*" component ={() => "404 NOT FOUND"} />
        </Switch>
      </div>
     </Router>
  );
} 

export default App;
