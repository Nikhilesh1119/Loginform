import React, { useState } from 'react';
import '../styles/form.css';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterValidate } from '../helper/validate.js';
import convertToBase64 from '../helper/convert.js';
import { registerUser } from '../helper/helper.js';

export default function Signup() {

    const navigate = useNavigate();
    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validate: RegisterValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async function (values) {
            values = await Object.assign(values, { profile: file || '' });
            // console.log(values);
            let userPromise = registerUser(values);
            console.log(userPromise);
            toast.promise(userPromise, {
                loading: 'Creating..',
                success: <b>Registered Successfully</b>,
                error: <b>Couldn't Registered</b>
            })
            userPromise.then(() => { navigate('/') });
        }
    })

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }


    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            <form onSubmit={formik.handleSubmit}>
                <div className="box">
                    <div className="container">
                        <div className="top">
                            <span>Have an account? <Link className='button' to="/">Login</Link></span>
                            <header>Signup</header>
                        </div>
                        <label htmlFor="profile">
                            <img src={file || avatar} className="profile_img" alt="" />
                        </label>
                        <input onChange={onUpload} type="file" name="Profile" id="profile" />
                        <div className="input-field">
                            <input {...formik.getFieldProps('username')} type="text" className="input" placeholder="Username" />
                        </div>

                        <div className="input-field">
                            <input {...formik.getFieldProps('email')} type="email" className="input" placeholder="email" />
                        </div>

                        <div className="input-field">
                            <input {...formik.getFieldProps('password')} type="Password" className="input" placeholder="Password" />
                        </div>

                        <div className="input-field">
                            <input type="submit" className="submit" value="Signup" />
                        </div>

                        <div className="two-col">
                            <div className="one">
                                <input type="checkbox" name="" id="check" />
                                <label htmlFor="check"> Remember Me</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
