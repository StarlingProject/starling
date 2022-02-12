import React  from 'react'
import {BiUserCircle} from 'react-icons/bi'
import{RiLockPasswordFill} from 'react-icons/ri'
import { Component, useState , useEffect } from 'react';
import validation from './validation';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';

import { connect} from 'react-redux';
import {loginUser} from '../../src/redux/actions/userActions';


export function Login(props) {

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    
    const [errors, setErrors] = useState({});
    
    let history = useHistory();

    

    const handlechange = (event) =>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        } );

    };
  

    const handleFormSubmit = (event) =>{
    event.preventDefault();
    setErrors(validation(values));
    const userData = {
        email: values.email,
        password: values.password,
    } 
    props.loginUser(userData, history);  
};
    const { classes , UI: { loading }} = props;

    return (
        <div>
            <form  className="form">
                <div className="input">
                    
                    
                    <input  type="text" name="email"  placeholder="E-mail" value={values.email} onChange={handlechange} />
                    {errors.email && <p className="error">{errors.email}</p>}


                    
                    <input type="password" name="password" placeholder="Mot de passe" value={values.password} onChange={handlechange} />
                    {errors.password && <p className="error">{errors.password}</p>}


                    

                </div>
                {errors.general && <p className="error">{errors.general}</p>}
                <div className='fotter'>
                    
                <p className="mdp">Mot de passe oublié?</p>
                <button className="btns" onClick={handleFormSubmit} >Connecter</button> 
                
                </div>
                
         </form>
        </div>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);