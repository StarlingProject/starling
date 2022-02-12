import React from 'react'
import { useState } from 'react';
import validation from './validation';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Sign() {

    const[Radio , setRadio]= useState({genre:""});

    const [values, setValues] = useState({
        fullname: "",
        prénom: "",
        pseudo: "",
        email: "",
        password: "",
        password2: "",
        loading: false,
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
    setValues({
        loading: true,
    });
    const newUserD = {
        nom: values.fullname,
        prenom: values.prénom,
        email: values.email,
        password: values.password,
        confirmPassword: values.password2,
        pseudo: values.pseudo
    }
    axios.post('/signup', newUserD).then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        history.push('/home');
    }).catch(err => {
        setErrors(
            err.response.data
        );
    });
};

    return (
        <div className="container"> 
            <div className ="app-wrapper">
                
                <form className="form-wrapper">

                    <div className='fullname'>
                    <div className="name">
                        <input className="input" type="text" name="fullname" placeholder='Nom' value={values.fullname} onChange={handlechange} />
                        {errors.fullname && <p className="error">{errors.fullname}</p>}
                    </div>

                    <div className="prénom">
                        <input className="input" type="text" name="prénom" placeholder='Prénom' value={values.prénom} onChange={handlechange} />
                        {errors.prénom && <p className="error">{errors.prénom}</p>}
                    </div>
                    </div>

                    <div className="pseudo">
                        <input className="input" type="text" name="pseudo" placeholder='pseudo' value={values.pseudo} onChange={handlechange} />
                        {errors.pseudo && <p className="error">{errors.pseudo}</p>}
                    </div>
                    


                    <div className="email">
                        <input className="input" type="email" name="email" placeholder='Email' value={values.email} onChange={handlechange}  />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="password">
                        <input className="input" type="password" name="password" placeholder='Mot de passe' value={values.password} onChange={handlechange} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="password2">
                        <input className="input" type="password" name="password2" placeholder='Confirmation de mot de passe' value={values.password2} onChange={handlechange} />
                        {errors.password2 && <p className="error">{errors.password2}</p>}
                    </div>
                    <div className='radioButton'>

                        <label className='Genre'>Genre:</label>
                        <br/> 


                     <div className='radio'>
                          <div className='border'>
                                <label className='Femme'>Femme</label>
                                <input type="radio"
                                name='genre' 
                                className='femme'
                                value="Femme" 
                                    />

                            </div>
                            
                            <div className='border'>
                                <label className='Homme'>Homme</label>
                                <input type="radio"
                                name='genre' 
                                className='homme'
                                value="Homme" 
                                />
                            </div>
                     </div>
                        
                        
                    
                    </div>


                    {errors. general && <p className="error">{errors. general}</p>}
                    <div>
                        
                        <button className="submit" onClick={handleFormSubmit} > S'inscrire</button>
                    </div>
                </form>
            </div>
       
    </div>
            
    
    )
}
