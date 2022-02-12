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
    backgroundColor: "white",
    color:"#19A8D9 ",
    [theme.breakpoints.up("sm")]:{
        backgroundColor: "white",
    color:"#19A8D9 ",
        // border: "1px solid #ece7e7"
    }

},
item:{
    display:"flex",
    alignItems: "center",
    marginBottom:theme.spacing(6),
    [theme.breakpoints.up("sm")]:{
        marginBottom:theme.spacing(6),
        cursor:"pointer"
    }
},
item2:{
    display:"flex",
    alignItems: "center",
    marginTop:theme.spacing(20),
    [theme.breakpoints.up("sm")]:{
        marginTop:theme.spacing(20),
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
    color:'#19A8D9',
    fontWeight:600,
    [theme.breakpoints.down("sm")]:{
        display:"none",
        
    },
},
link:{
    color:"#19A8D9",
    textDecoration: "none",
}

}));


 const Leftbar = () => {



    const token = localStorage.getItem("FBIdToken");
    const [user, setUser] = useState(false);
    const [nbrnotif, setNbrnotif] = useState();
    const [nbrmess, setNbrmess] = useState();


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
            if((decodedToken.exp * 1000 - Date.now()) < 600000){

                try {
                    // localStorage.removeItem("FBIdToken");
                    // localStorage.removeItem("RefToken");
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
                getnbrnotif();
                getnbrmess();
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
            <NavLink onClick={go} to="/home" exact className={classes.link}>
                <Typography className={classes.text}>Actualité</Typography>
                
            </NavLink>
        </div>

        <div className={classes.item} >
            <NavLink onClick={goprofil} to='/profil/user.credentials.userId' exact className={classes.link}>
                <Person className={classes.icon}/>
            </NavLink>
            <NavLink onClick={goprofil} to='/profil/user.credentials.userId' exact className={classes.link}> 
               <Typography className={classes.text}>Profil</Typography>
            </NavLink>
                
        </div>
        <div className={classes.item}>
            <Link onClick={gotohell} to='/Notifications' exact className={classes.link}>
                 <Badge badgeContent={nbrnotif} color="secondary" >
                <Notifications className={classes.icon}/>
                </Badge>
            </Link>
            <NavLink onClick={gotohell} to='/Notifications' exact className={classes.link}>
                <Typography className={classes.text}>Notifications</Typography>
            </NavLink>
        </div>
            
        <div className={classes.item}>
            <NavLink onClick={goMessages} to="/Messagerie/user.credentials.userId" exact className={classes.link}>
               <Badge badgeContent={nbrmess} color="secondary" >
                <Mail className={classes.icon}/>
                </Badge>
            </NavLink>
            <NavLink onClick={goMessages} to="/Messagerie/user.credentials.userId" exact className={classes.link}>
                <Typography className={classes.text}>Messages</Typography>
            </NavLink>
        </div>

            
        <div className={classes.item}>
                <NavLink onClick={gotosett} to="/settings" exact className={classes.link}>
                
                    <Settings className={classes.icon}/>
                    
                </NavLink>
                <NavLink onClick={gotosett} to="/settings" exact className={classes.link}>
                    <Typography className={classes.text}>settings</Typography>
                </NavLink>
                
                
                
        </div>
        <div className={classes.item}>
                <NavLink onClick={desc} to="/" exact className={classes.link}>
                <ExitToApp className={classes.icon}/>
                </NavLink>
                <NavLink onClick={desc} to="/" exact className={classes.link}>
                <Typography className={classes.text}>Déconnexion</Typography>
                </NavLink>
        </div>
      </Container>
        
    );
};
export default Leftbar;
