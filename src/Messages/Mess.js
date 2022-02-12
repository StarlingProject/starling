
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { Grid, makeStyles } from '@material-ui/core';

import Messagerie from "./Messagerie/Messagerie";
import "./Messagerie/Messagerie.css";



let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    //window.location.href = "/";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function Messages() {
  return (
    <div className="Appp">

            <Grid container>

            <Grid item sm={12} xs={12}><Messagerie/></Grid>

            </Grid> 
      {/* <Router>
        <Switch>
          <Route exact path="/Messagerie/:idMessage" component={Messagerie} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default Messages;

{
  /* <div className="Main">

<div className="Left_Sidebar_Area">
  <Left/>
</div>

<div className="Right_Sidebar_Area">
  <SignInOutContainer/> 
</div>
</div> */
}
