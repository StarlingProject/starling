import React, { useEffect } from "react";
import { useState } from "react";
import validation from "./validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Google , Facebook } from "react-bootstrap-icons";
import { Redirect, NavLink , Link} from 'react-router-dom';
import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  getAuth
} from "firebase/auth";
import { auth, db ,setDoc } from "../profil/Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import routeApi from "../api/routes";
import jwtDecode from 'jwt-decode';
import "../App.css";
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
      // color:"royalblue",
      textDecoration: "none",
      
  }
  
  }));
  

export default function Sign() {
  const [Radio, setRadio] = useState({ genre: "" });
  const [emails, setemails] = useState([]);

  const [values, setValues] = useState({
    fullname: "",
    prénom: "",
    pseudo: "",
    email: "",
    password: "",
    password2: "",
    loading: false,
  });

  const getemails = async () => {
    const result = await routeApi.emails();
    if (!result.ok) return console.log(result);

    setemails(result.data);
};

  const [errors, setErrors] = useState({});
  let history = useHistory();

  const handlechange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setErrors({});
  };

  // const signInWithFacebook = () => {
  //   const provider = new FacebookAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
        
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setValues({
      loading: true,
    });
    const newUserD = {
      nom: values.fullname,
      prenom: values.prénom,
      email: values.email.toLocaleLowerCase(),
      password: values.password,
      confirmPassword: values.password2,
      pseudo: values.pseudo,
    };

  
        if (emails.indexOf(values.email) !== -1){
          setErrors({email: "cette email exist deja reesayer SVP"});

        }
      else{
      axios
      .post("/signup", newUserD)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        
        history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
      }
        
      


    // const auth = getAuth();
    // sendEmailVerification(auth.currentUser)
    // .then((Response) => {
    // Email verification sent!
    // ...
    //  if(Response.emailVerified == true){
    //  }else{
    //   alert("etes vous sur que cette email existe ? ressayer SVP "); 
    //  }

    // }).catch((err) => {
    //   alert("problem !! ressayer SVP "+err);
    // }); 

    setValues({
      fullname: "",
      prénom: "",
      pseudo: "",
      email: "",
      password: "",
      password2: "",
      
    });

  };

  useEffect(() => {
    getemails();
    
  }, []);

  const classes = useStyles();
  return (
    <div className="container">
      <div className="app-wrapper">
        <form className="form-wrapper">
          <div className="fullname">
            <div className="name">
              <input
                className="input"
                type="text"
                name="fullname"
                placeholder="Nom"
                value={values.fullname}
                onChange={handlechange}
              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>

            <div className="prénom">
              <input
                className="input"
                type="text"
                name="prénom"
                placeholder="Prénom"
                value={values.prénom}
                onChange={handlechange}
              />
              {errors.prénom && <p className="error">{errors.prénom}</p>}
            </div>
          </div>

          <div className="pseudo">
            <input
              className="input"
              type="text"
              name="pseudo"
              placeholder="pseudo"
              value={values.pseudo}
              onChange={handlechange}
            />
            {errors.pseudo && <p className="error">{errors.pseudo}</p>}
          </div>

          <div className="email">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handlechange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="password">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={values.password}
              onChange={handlechange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="password2">
            <input
              className="input"
              type="password"
              name="password2"
              placeholder="Confirmation de mot de passe"
              value={values.password2}
              onChange={handlechange}
            />
            {errors.password2 && <p className="error">{errors.password2}</p>}
          </div>
          {/* <div className="radioButton">
            <label className="Genre">Genre:</label>
            <br />

            <div className="radio">
              <div className="border">
                <label className="Femme">Femme</label>
                <input
                  type="radio"
                  name="genre"
                  className="femme"
                  value="Femme"
                />
              </div>

              <div className="border">
                <label className="Homme">Homme</label>
                <input
                  type="radio"
                  name="genre"
                  className="homme"
                  value="Homme"
                />
              </div>
            </div>
          </div> */}

          {errors.general && <p className="error">{errors.general}</p>}
          <div>
            <button className="submit" onClick={handleFormSubmit}>
              {" "}
              S'inscrire
            </button>
            </div>
            {/* <div>
            
            <NavLink onClick={signInWithGoogle} to="/" exact className="">
                <Google  size={26}></Google><Typography >connecter avec google</Typography>
            </NavLink>
            </div> */}
            {/* <div>
            
            <NavLink onClick={signInWithFacebook} to="/" exact className="">
                <Facebook  size={26}></Facebook><Typography >connecter avec google</Typography>
            </NavLink>
            </div> */}

        <div className={classes.item}>
            <NavLink onClick={signInWithGoogle} to="/" exact className={classes.link}>
                 <Google  size={26}>  </Google>
            </NavLink>
            <NavLink style={{marginLeft: 10,}} onClick={signInWithGoogle} to="/" exact  className={classes.link}>
                <Typography >s'inscrire avec Google</Typography> 
            </NavLink>
        </div>

            <div className={classes.item}>
            <NavLink onClick={signInWithFacebook} to="/" exact className={classes.link}>
                 <Facebook  size={26}>  </Facebook>
            </NavLink>
            <NavLink style={{marginLeft: 10,}} onClick={signInWithFacebook} to="/" exact  className={classes.link}>
                <Typography >s'inscrire avec Facebook</Typography> 
            </NavLink>
        </div>
        </form>
      </div>
    </div>
  );
}
