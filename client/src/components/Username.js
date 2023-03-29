import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { UsernameValidate } from '../helper/validate';
import {useAuthStore} from '../store/store.js';
import '../styles/form.css';
import avatar from "../assets/profile.png";

export default function Username() {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state=>state.setUsername);

    const formik = useFormik({
        initialValues:{ username:''},
        validate:UsernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async function(values){
            setUsername(values.username);
            // console.log(values);
            navigate('/password')
        }
    })

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit}>
                    <div className="box">
                        <div className="container">
                            <div className="top">
                                <span>Not a member? <Link className='button' to="/signup">Signup</Link></span>
                                <header>Login</header>
                            </div>

                            <img src={avatar} className="profile_img" alt="" />

                            <div className="input-field">
                                <input {...formik.getFieldProps('username')} type="text" className="input" placeholder="Username" />
                            </div>

                            <div className="input-field">
                                <input type="submit" className="submit" value="Login" />
                            </div>
                        </div>
                    </div>
                </form>
        </div>
    )
}
