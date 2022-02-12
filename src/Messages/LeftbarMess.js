import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, ExitToApp, Home, Person, Mail, Settings,Notifications, NoEncryption } from '@material-ui/icons';
import React , {useState ,useEffect}from 'react'
import { Redirect, NavLink , Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import routeApi from "../api/routes";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Amel from '../pages/amel'

import { db, auth, storage, user } from "../profil/Firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";




const useStyles = makeStyles((theme)=> ({
Container: {
    position:"sticky",
    top:"0",

    height:"100vh",
    paddingTop: theme.spacing(10),
    backgroundColor: "#19A8D9",
    color:"white",
    [theme.breakpoints.up("sm")]:{
        backgroundColor: "#19A8D9",
    color:"white",
        border: "1px solid #ece7e7"
    }

},
item:{
    display:"flex",
    alignItems: "center",
    marginBottom:theme.spacing(4),
    [theme.breakpoints.up("sm")]:{
        marginBottom:theme.spacing(3),
        cursor:"pointer"
    }
},
icon:{
  
    [theme.breakpoints.up("sm")]:{
        fontsize:"18px",
    }
},

text:{
    marginLeft: theme.spacing(2),
    fontWeight:600,
    [theme.breakpoints.down("sm")]:{
        display:"none",
        
    },
},
link:{
    color:"white",
    textDecoration: "none",
}

}));


 const Leftbar = () => {



    const token = localStorage.getItem("FBIdToken");
    const [user, setUser] = useState(false);

    const getData = async () => {
        const result = await routeApi.getUser(token);
        if (!result.ok) return console.log(result);
    
        setUser(result.data);
      };
   
    let history = useHistory();

    const go =() => {
        history.push('/home');
        window.location.reload('/home');
    }

    const goprofil =() => {
        history.push(`/profil/${user.credentials.userId}`);
        window.location.reload(`/profil/${user.credentials.userId}`);
    }
    
    const goMessages =() => {
        history.push(`/Messagerie/${user.credentials.userId}`);
        window.location.reload(`/Messagerie/${user.credentials.userId}`);
    }
    const gotohell =() => {
        history.push('/Notifications');
        window.location.reload('/Notifications');
    }
    const gotosett =() => {
        history.push('/settings');
        window.location.reload('/settings');
    }

    const desc = async () => {
        const token = localStorage.getItem("FBIdToken");
        await updateDoc(doc(db, "Users", user.credentials.userId ), { AppelID: "none" }); 
        const result = await routeApi.deconnecter(token);
        if (result.ok){
            localStorage.removeItem("FBIdToken");
            localStorage.removeItem("RefToken");
            history.push('/');
            window.location.reload('/')  
        }else{console.log(result)}
        
    }
    const [nbrnotif, setNbrnotif] = useState();
    const [nbrmess, setNbrmess] = useState();
    const getnbrnotif = async () => {
        const token = localStorage.getItem("FBIdToken");
        const result = await routeApi.getnbrnotif(token);
        if (result.ok){
            if(result.data.nbr !== 0 ){
            setNbrnotif(result.data.nbr);
            } 
        }
    }

    const getnbrmess = async () => {
        const token = localStorage.getItem("FBIdToken");
        const result = await routeApi.getnbrmess(token);
        if (result.ok){
            if(result.data.nbr !== 0 ){
            setNbrmess(result.data.nbr);
            } 
        }
    }

    
    useEffect(() => {
        const token = localStorage.getItem("FBIdToken");
        const refresh_token = localStorage.getItem("RefToken");
        if (!token){
            history.push('/')
        }else{
            let authenticated;
            const token = localStorage.FBIdToken;
            const refresh_token = localStorage.RefToken;
            if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 < Date.now()-600000){

                try {
                    localStorage.removeItem("FBIdToken");
                    localStorage.removeItem("RefToken");
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
                getData();
                getnbrmess();
                getnbrnotif();
                authenticated = true;
            }
            }
        }
        
        ;
      }, []);

    const classes = useStyles();
    return (
      <Container className={classes.Container}>
          
            
        <div className={classes.item}>
            <NavLink onClick={go} to="/home" exact className={classes.link}>
                <Home className={classes.icon}/>
            </NavLink>
        </div>

        <div className={classes.item} >
            <NavLink onClick={goprofil} to='/profil/user.credentials.userId' exact className={classes.link}>
                <Person className={classes.icon}/>
            </NavLink>
                
        </div>
        <div className={classes.item}>
            <Link onClick={gotohell} to='/Notifications' exact className={classes.link}>
                 <Badge badgeContent={nbrnotif} color="secondary" >
                <Notifications className={classes.icon}/>
                </Badge>
            </Link>
        </div>
            
        <div className={classes.item}>
            <NavLink onClick={goMessages} to="/Messagerie/user.credentials.userId" exact className={classes.link}>
               <Badge badgeContent={nbrmess} color="secondary" >
                <Mail className={classes.icon}/>
                </Badge>
            </NavLink>
        </div>

            
        <div className={classes.item}>
                <NavLink onClick={gotosett} to="/settings" exact className={classes.link}>
                
                    <Settings className={classes.icon}/>
                    
                </NavLink>
                
                
                
        </div>
        <div className={classes.item}>
                <NavLink onClick={desc} to="/" exact className={classes.link}>
                <ExitToApp className={classes.icon}/>
                </NavLink>
        </div>
      </Container>
        
    );
};
export default Leftbar;
