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

  let history = useHistory();
  
  
  useEffect(async () => {
    const token = localStorage.getItem("FBIdToken");
    const refresh_token = localStorage.getItem("RefToken");
    if (token){
        let authenticated;
        const token = localStorage.FBIdToken;
        const refresh_token = localStorage.RefToken;
        if(token){
        const decodedToken = jwtDecode(token);
        if((decodedToken.exp * 1000 - Date.now()) < 600000){

            try {
              //   localStorage.removeItem("FBIdToken");
              //   localStorage.removeItem("RefToken");
                let data = {
                    grant_type:"refresh_token",
                    refresh_token: refresh_token 
                }
                axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                    localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`)
                    localStorage.setItem("RefToken", `${res.data.refresh_token}`)
                })
                authenticated = false;
            } catch (error) {
                console.log(error);
            }
        } else {
            authenticated = true;
        }
        }
    }else{
      history.push('/');
      window.location.reload('/');
    }
    
  }, []);

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

