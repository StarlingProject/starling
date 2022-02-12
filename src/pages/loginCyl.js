import React from "react";

import { useState } from "react";
import validation from "./validation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../profil/Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import Popup from "./Popup";


export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: null,
  });

  const history = useHistory();
  const { email, password, error, loading } = values;

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const handlechange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setValues({ ...values, error: null, loading: true });
    if (!email || !password || !error || !loading) {
      setValues({ ...values, error: "All fields are required" });
    }

    try {
      const user = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          //const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          alert(error.message);
        });
      /*const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((error) => {
        document.querySelector(".error.reg_error").innerHTML = error.message;
      });
      */
      await updateDoc(doc(db, "Users", user.user.uid), {
        isOnline: true,
      });

      setValues({
        email: "",
        password: "",

        error: null,
        loading: false,
      });
      history.replace("/Home");
    } catch (err) {
      setValues({ ...values, error: err.message, loading: false });
    }
  };
  const [state, setstate] = useState(false);
  const toggleBtn = (event) => {
    event.preventDefault();
    setstate((prevState) => !prevState);
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(`reset password successful to ${email}`);
      })
      .catch((error) => {
        console.log(`reset password error to ${email}`);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("FBIdToken", `Bearer ${result.data.token}`);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //signInWithRedirect(auth, provider);

  return (
    <div>
      <form className="form">
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
        <button
          disabled={loading}
          className="submit"
          onClick={handleFormSubmit}
        >
          {" "}
          {loading ? "logging in ..." : "connexion"}
        </button>
      </form>
      <div className="fotter">
        {isOpen && <Popup handleClose={togglePopup} />}
        <button className="popup" onClick={togglePopup}>
          Mot de passe oublié?
        </button>
      </div>

      <button onClick={signInWithGoogle}>connecter avec google</button>
    </div>
  );
}