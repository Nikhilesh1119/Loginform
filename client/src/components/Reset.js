import '../styles/form.css';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { resetPasswordValidate } from '../helper/validate.js';
import { resetPassword } from '../helper/helper.js';
import { useAuthStore } from '../store/store.js';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetchhooks.js';

export default function Reset() {

    const navigate = useNavigate();
    const { username } = useAuthStore(state => state.auth);
    const [{ isLoading, status, serverError }] = useFetch('createResetSession');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async function (values) {
            let resetPromise = resetPassword({ username, password: values.password })
            toast.promise(resetPromise, {
                loading: 'Updating...',
                success: <b>Reset Successfully...!</b>,
                error: <b>Could not Reset!</b>
            });
            resetPromise.then(function () { navigate('/password') })
        }
    })
    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if (status && status !== 201) {
        return <Navigate to={'/password'} replace={true}></Navigate>
    }

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            <form onSubmit={formik.handleSubmit}>
                <div className="box">
                    <div className="container">
                        <div className="top">
                            <header>Reset Password</header>
                        </div>

                        <div className="input-field">
                            <input {...formik.getFieldProps('password')} type="text" className="input" placeholder="Enter Password" />
                        </div>

                        <div className="input-field">
                            <input {...formik.getFieldProps('confirm_password')} type="text" className="input" placeholder="Conform Password" />
                        </div>

                        <div className="input-field">
                            <input type="submit" className="submit" value="Reset" />
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}
