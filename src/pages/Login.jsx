import "../assets/stylesheets/app.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import React,{useState} from "react";
import axios from "axios";

function Login(){
    const navigator = useNavigate()
    const data = useState({
        email: '',
        Password: '',
        validat: ''
    })
    const url = 'http://localhost:3000/api/users/login'

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values =>{
        const data = values;
        console.log(data);
 

        axios.post(url,{
            email: data.email,
            Password: data.Password,
            vali: data.validat
        })
            .then(res =>{
                if (res.request.status === 200){
                

                    Swal.fire(
                        'Bienvenido!',
                        '' + res.data.data.name +'',
                        'success'
                    )
                    navigator("/home");

                }
            })
            .catch(err => {
                Swal.fire(
                    'Error!',
                    ''+ err.response.data.error +'',
                    'error'
                )
                console.log(err.request.status)
                console.log(data.Password)
            })
                               


    }
    return (
        <div>

            <div >
                <form className="from"  noValidate onSubmit={handleSubmit(onSubmit)}>

                    <h1 className="from-title">Login</h1>

                    <div className="from-group">

                        <input type="text" className="from-input" id="email" placeholder="Email" required {...register("email",{
                            required: {
                                value: true,
                                message: "El campo requerido",
                            },
                            pattern:{
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalido email"
                            }
                        })}></input>
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        <label  className="from-label">User</label>
                    </div>
                    <div className="from-group">
                        <input type="password" className="from-input" placeholder="Password" required {...register("Password",{
                            required: {
                                value: true,
                                message: "El campo requerido",
                            },
                            minLength:{
                                value: 4,
                                message: "La contraseña debe tener minimo 4 caracteres"
                            }
                        })}></input>
                        {errors.Password && <span className="text-danger">{errors.Password.message}</span>}
                        <label  className="from-label">Password</label>
                    </div>
                    <button className="from-submit"  >Login</button>
                    <button   className="from-submit-Second" >
                        <a href="/signUp" className="a link">Sign Up</a>
                    </button>
                </form>
            </div>

        </div>


    );
}

export default Login;