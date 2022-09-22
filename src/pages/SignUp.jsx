import "../assets/stylesheets/app.css";
import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import logo from "../assets/img/logo.png";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function SignUp(){
    const navigator = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm();


    const url = 'http://localhost:3000/api/users/create';
    const [data,setData] = useState({
        usuario: "",
        email: "",
        Password: ""
    });
    function Enviar(e){
        e.preventDefault();
        axios.post(url,{
            usuario: data.usuario,
            email:data.email,
            Password: data.Password
        })
        Swal.fire({
            title: 'DATOS AGREGADO EXITOSOS',
            text: "",
            icon: 'success',
            confirmButtonColor: '#0e46ff',
            confirmButtonText: 'Okay'
        })
        navigator("/")
    }
    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)

    }


    return (
        <React.Fragment>

                        <div className="from-first">

                            <form className="from-second" >
                                <img src={logo} className="logo" alt=""/><br/>
                                <h1 className="from-title">Sign Up</h1>
                                <div className="from-group">

                                    <div className="from-group">
                                        <input  onChange={(e)=>handle(e)} id="email" value={data.email}type="tex" className="from-input" placeholder="email"/>
                                        <label  className="from-label">Email</label>
                                    </div>
                                    <div className="from-group">
                                        <input onChange={(e)=>handle(e)} id="usuario" value={data.usuario} type="tex" className="from-input" placeholder="user"/>
                                        <label  className="from-label">User</label>
                                    </div>
                                    <div className="from-group">
                                        <input onChange={(e)=>handle(e)} id="Password" value={data.Password} type="tex" className="from-input" placeholder="Password"/>
                                        <label  className="from-label">Password</label>
                                    </div>
                                </div>

                                    <button className="from-submit" onClick={(e)=>Enviar(e)}>Login</button>
                            </form>
                        </div>

        </React.Fragment>
    );
}

export default SignUp;