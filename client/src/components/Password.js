import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast,Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { PasswordValidate } from '../helper/validate.js';
import useFetch from '../hooks/fetchhooks.js';
import { useAuthStore } from '../store/store.js';
import { verifyPassword } from '../helper/helper.js';

import '../styles/form.css';
import avatar from "../assets/profile.png";

export default function Password() {

    const navigate = useNavigate();
    const {username} = useAuthStore(state=>state.auth);
    const[{isLoading, apiData, serverError}]= useFetch(`/user/${username}`);
    const formik = useFormik({
        initialValues:{ password:''},
        validate:PasswordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values=>{
            let loginPromise = verifyPassword({username,password:values.password});
            toast.promise(loginPromise,{
                loading:"Checking..",
                success: <b>Login Successfully!</b>,
                error: <b>Password Not Match!</b>
            })
            loginPromise.then(res=>{
                let token = res.data.data.token;
                localStorage.setItem('token',token);
                navigate('/profile');

            })
        }
    })
    if(isLoading)return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit}>
                <div className="box">
                    <div className="container">
                        <div className="top">
                            <header>Login</header>
                        </div>

                        <img  src={apiData?.profile || avatar} className="profile_img" alt="" />

                        <div className="input-field">
                            <input {...formik.getFieldProps('password')} type="text" className="input" placeholder="Password" />
                        </div>

                        <div className="input-field">
                            <input type="submit" className="submit" value="Login" />
                        </div>
                        <div className="top">
                            <span>
                                <Link to="/forgot-password" className='button'>Forgot Password ?</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
