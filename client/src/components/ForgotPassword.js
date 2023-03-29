import React, { useEffect, useState } from 'react';
import '../styles/form.css';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store.js';
import { generateOTP, verifyOTP } from '../helper/helper.js';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  // console.log(OTP);
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP)
        return toast.success("OTP has send to your email");
      return toast.error("Problem in generating OTP");
    })
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      let { status } = await verifyOTP(username, OTP)
      if (status === 201) {
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }



  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: 'Sending..',
      success: <b>OTP has been send to your email</b>,
      error: <b>Couldn't send OTP</b>
    });
    sendPromise.then(OTP => {
      console.log(OTP);
    })
  }

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <form onSubmit={onSubmit}>
        <div className="box">
          <div className="container">
            <div className="top">
              <header>Recovery</header>
            </div>

            <div className="input-field">
              <input onChange={(e) => { setOTP(e.target.value) }} type="text" className="input" placeholder="Enter 6 digit otp" />
            </div>

            <div className="input-field">
              <input type="submit" className="submit" value="Recover" />
            </div>

            <div className="top">
              <span>can't get OTP? <button onClick={resendOTP} className='button'>Resend</button></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
