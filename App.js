import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Dashboard  from "./Container/Dashboard/Dashboard";


function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route  path="/" exact component={Dashboard} />

        </Switch>
    </div>
  );
}

export default App;


