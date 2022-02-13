import React, { useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import validation from "./validation";
import axios from "axios";
import { Link, useHistory ,NavLink  } from "react-router-dom";
import { loginUser } from "../profil/Firebase/firebase";
import { Google ,Facebook } from "react-bootstrap-icons";
import { GridLoader ,BarLoader } from 'react-spinners';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  getPhoneNumberFromUserInput,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db ,setDoc } from "../profil/Firebase/firebase";
import Popup1 from "./Popup1";
import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';
import routeApi from "../api/routes";
import jwtDecode from 'jwt-decode';
import './login.css';


const useStyles = makeStyles((theme)=> ({
  Container: {
      position:"auto",
      top:"0",
      paddingTop: theme.spacing(6),
      color:"white",
      // [theme.breakpoints.up("sm")]:{
      //     backgroundColor: "#19A8D9",
      // color:"white",
      //     border: "1px solid #ece7e7"
      // }
  
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
      // color:"royalblue",
      textDecoration: "none",
      
  }
  
  }));
  

export default function Login() {


  const [emails, setemails] = useState([]);

 

  const getemails = async () => {
    const result = await routeApi.emails();
    if (!result.ok) return console.log(result);

    setemails(result.data);
};

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});

  let history = useHistory();
  const togglePopup = (event) => {
    event.preventDefault();
    
    if (!values.email ){
      setErrors({email: "Veillrz saisir un email s'il vous plait"});
    }else{
      if (emails.indexOf(values.email) !== -1){
      setIsOpen(!isOpen);
      sendPasswordResetEmail(auth, values.email)
      .then(() => {
        console.log(`reset password successful to ${values.email}`);
      })
      .catch((error) => {
        console.log(`reset password error to ${values.email}`);
      });
      }
    else{
      setErrors({email:"vous n'avez pas de compte avec cette email" });
      
    }

      
    }
  
  };
  const handlechange = (event) => {
    setValues({
      loading: false,
    });
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setErrors({});
  };

  const handleFormSubmit = (event) => {
    setValues({
      loading: true,
    });
    event.preventDefault();
    setErrors(validation(values));
    

    const userData = {
      email: values.email,
      password: values.password,
    };

    loginUser(values.email, values.password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        localStorage.setItem("RefToken", `${res.data.refresh_token}`)
        setValues({
          loading: false,
        });
        history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });

      setValues({
        email: "",
        password: "",
      });
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        let infos = {
          email : result.user.email,
          nom: result._tokenResponse.firstName,
          prenom: result._tokenResponse.lastName,
          pseudo: result._tokenResponse.firstName,
          Displayname : result.user.displayName,
          imageUrl: result.user.photoURL,

          userId: result._tokenResponse.localId,
          
          isOnLign: true,
          createdat: new Date().toISOString(),
          bio: 'aucune biographie fournie',
          dateNaissance: 'non renseignée',
          blk:[],

        }
        let token = result._tokenResponse.idToken;
        let RefToken = result._tokenResponse.refreshToken

        if (emails.indexOf(infos.email) !== -1){

          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `${RefToken}`);
          history.push('/home');

          // sendPasswordResetEmail(auth, values.email)
          // .then(() => {
          //   console.log(`reset password successful to ${values.email}`);
          // })
          // .catch((error) => {
          //   console.log(`reset password error to ${values.email}`);
          // });
          } else {
            setDoc(doc(db , "Users", infos.userId), infos)
            .then()
            .catch((error) => {
              console.log(error.message);
            });
            localStorage.setItem("FBIdToken", `Bearer ${token}`);
            localStorage.setItem("RefToken", `${RefToken}`);
            history.push('/home');
          }
        ;
        

        console.log(result);
        // console.log(dataa);
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then( async (result) => {
        // localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        let infos = {
          email : result.user.email,
          nom: result._tokenResponse.firstName,
          prenom: result._tokenResponse.lastName,
          pseudo: result._tokenResponse.firstName,
          Displayname : result.user.displayName,
          imageUrl: result.user.photoURL,

          userId: result._tokenResponse.localId,
          
          isOnLign: true,
          createdat: new Date().toISOString(),
          bio: 'aucune biographie fournie',
          dateNaissance: 'non renseignée',
          blk:[],

        }
        let token = result._tokenResponse.idToken;
        let RefToken = result._tokenResponse.refreshToken

        if (emails.indexOf(infos.email) !== -1){
          await updateDoc(doc(db, "Users", infos.userId), {
            isOnLign: true,
          });
          localStorage.setItem("FBIdToken", `Bearer ${token}`);
          localStorage.setItem("RefToken", `Bearer ${RefToken}`);
          history.push('/home');
          // sendPasswordResetEmail(auth, values.email)
          // .then(() => {
          //   console.log(`reset password successful to ${values.email}`);
          // })
          // .catch((error) => {
          //   console.log(`reset password error to ${values.email}`);
          // });
          } else {
            setDoc(doc(db , "Users", infos.userId), infos)
            .then()
            .catch((error) => {
              console.log(error.message);
            });
            localStorage.setItem("FBIdToken", `Bearer ${token}`);
            localStorage.setItem("RefToken", `${RefToken}`);
            history.push('/home');
          }
        ;
        

        // console.log(result);
        // console.log(dataa);
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getemails();
    
  }, []);

  useEffect(() => {
    const tokenn = localStorage.getItem("FBIdToken");
    if (tokenn){
      history.push('/home')
        const token = localStorage.FBIdToken;
        if(token){
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 > Date.now()){
            history.push('/home')
        } 
        }
    }
    
  }, []);

  const classes = useStyles();
  return (
    <div>

      <form className="form" >
        <div className="input">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handlechange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={values.password}
            onChange={handlechange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {errors.general && <p className="error">{errors.general}</p>}
        <div className="fotter">
        {isOpen && <Popup1 handleClose={togglePopup} />}
        <NavLink onClick={togglePopup} to="/" exact className="">
                <Typography >Mot de passe oublié? </Typography>
                </NavLink>

          <button className="btns" onClick={handleFormSubmit}>
              connexion
          </button>
          <>
          { values.loading === true &&(
          <BarLoader size={4} color='royalblue'  />)
          }
          </>
          

          
          

        </div>
        {/* <div className="lienn" >
           <NavLink onClick={signInWithGoogle} to="/" exact className="">
                <Google  size={26}></Google>
                <Typography >conntinuer avec google</Typography>
          </NavLink>
           </div> */}
           <Container className={classes.Container}>
                   <div style={{ width: '300px'}} className={classes.item}>
            <NavLink onClick={signInWithGoogle} to="/" exact className={classes.link}>
                 <Google  size={26}>  </Google>
            </NavLink>
            <NavLink style={{marginLeft: 10,}} onClick={signInWithGoogle} to="/" exact  className={classes.link}>
                <Typography >continuer avec Google</Typography> 
            </NavLink>
        </div>

            <div style={{ width: '300px'}} className={classes.item} >
            <NavLink onClick={signInWithFacebook} to="/" exact className={classes.link}>
                 <Facebook  size={26}>  </Facebook>
            </NavLink>
            <NavLink style={{marginLeft: 10, width: '200px'}} onClick={signInWithFacebook} to="/" exact  className={classes.link}>
                <Typography >continuer avec Facebook</Typography> 
            </NavLink>
        </div>
        </Container>
      </form>
    </div>
  );
}
