import './App.css';

import Appl from './pages/wis';
import Amel from './pages/amel';
import Blq from './components/bloque/blq';
import AuthRoute from './util/AuthRoute';
import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch , useHistory} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Messagerie from './Messages/Messagerie/Messagerie';

import {Provider} from 'react-redux';
import store from './redux/store';
import Prof from "./profil/prof";
import Profile from './profil/Profile';
import Messa from './Messages/Mess'
import Notifications from './components/Notifications/Notifications';
import OneP from './components/Notifications/notifications/pub';
import axios from 'axios';

import "./App.css"


function App() {

  
  


  return (
    <Provider store={store}>
     
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Appl}/>
          <Route exact path='/home' component={Amel}/>
          <Route exact path="/profil/:idProfil" component={Prof} />
          <Route exact path="/Messagerie/:idMessage" component={Messa} />
          <Route exact path='/settings' component={Blq}/>
          <Route exact path='/Notifications' component={Notifications}/>
          {/* <Route exact path='/Appel/:idcaller/:idtocall' component={AppVID}/> */}
          <Route exact path="/post/:idpost" component={OneP} />
        </Switch>
      </Router>
     
    </div>
    </Provider>
  );
}

export default App;

