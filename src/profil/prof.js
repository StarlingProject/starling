import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Leftbar from '../components/Leftbar';
import Navbar from '../components/Navbar';
import Profile from './Profile';
import {Right} from '../components/Right';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory
} from 'react-router-dom'
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import jwtDecode from 'jwt-decode';



const useStyles = makeStyles((theme)=> ({
    right:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        },
    },
}));


export default function Prof() {

    

    const [Loading, setLoading] = useState(false);
    let history = useHistory();
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
                setLoading(true);
                try {
                    let data = {
                        grant_type:"refresh_token",
                        refresh_token: refresh_token 
                    }
                    axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => { 
                        localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
                        localStorage.setItem("RefToken", `${res.data.refresh_token}`); 
                        
                        setLoading(false)
                    })
                    authenticated = false;
                    
                    } catch (error) {
                        console.log(error);
                    }
            } else {
                
                authenticated = true;
            }
            }
        }
      return  
      }, []);
  
    // useEffect(async () => {
    //   const token = localStorage.getItem("FBIdToken");
    //   const refresh_token = localStorage.getItem("RefToken");
    //   if (token){
    //       let authenticated;
    //       const token = localStorage.FBIdToken;
    //       const refresh_token = localStorage.RefToken;
    //       if(token){
    //       const decodedToken = jwtDecode(token);
         
    //       if((decodedToken.exp * 1000 - Date.now()) < 600000){
            
    //           try {
    //             //   localStorage.removeItem("FBIdToken");
    //             //   localStorage.removeItem("RefToken");
    //               let data = {
    //                   grant_type:"refresh_token",
    //                   refresh_token: refresh_token 
    //               }
    //               axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
    //                   localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`)
    //                   localStorage.setItem("RefToken", `${res.data.refresh_token}`)
    //               })
    //               authenticated = false;
    //           } catch (error) {
    //               console.log(error);
    //           }
    //       } else {
    //           authenticated = true;
    //       }
    //       }
    //   }else{
    //     history.push('/');
    //     window.location.reload('/');
    //   }
      
    // }, []);

    const classes = useStyles();
    return (
        <div>


        {Loading == true &&  (
                <div className='app'>   
                <GridLoader size={30} color='royalblue' Loading={Loading} />
                </div>
            )  
        }
        {   Loading == false && (
            <div>
             <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router>
                <Leftbar/>
               
            </Router>
            </Grid>
            <Grid item sm={7} xs={9}><Profile/></Grid>
            <Grid item sm={2} xs={2} classes={classes.right}><Right/></Grid>
            
             </Grid> 
             </div>
        )

        }






            {/* <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router>
                <Leftbar/>
               
            </Router>
            </Grid>
            <Grid item sm={6} xs={10}><Profile/></Grid>
            <Grid item sm={2} xs={2} classes={classes.right}><Right/></Grid>
            
             </Grid>   */}
               
            
            
        </div>
    )
}
 {/* <main>
                    <Switch>
                        
                        <Route exact path="/home" component={Amel}/>
                        
                        <Route exact path="/Profil" component={Profil}/>
                        
                        <Route exact path="/Messages" component={Message}/>
                        
                        <Route exact path="/Notifications" component={Notifications}/>
                        
                        <Redirect to="/" />
                    </Switch>
                </main> */}