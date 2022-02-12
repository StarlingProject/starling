import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import validation from "./validation";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loginUser } from "../profil/Firebase/firebase";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const [errors, setErrors] = useState({});

  let history = useHistory();

  const handlechange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setValues({
      loading: true,
    });

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
        console.log(res);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setValues({
          loading: false,
        });
        history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

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
        {errors.general && <p className="error">{errors.general}</p>}
        <div className="fotter">
          <p className="mdp">Mot de passe oublié?</p>
          <button className="btns" onClick={handleFormSubmit}>
            Connecter
          </button>
        </div>
      </form>
    </div>
  );
}
