import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import QAuth from '../component/QAuth';


const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({ email: '', password: '' })

    const { email, password } = formData

    const navigate = useNavigate();

    const changeHandle = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // get the value from the input forms by the id 
            [e.target.id]: e.target.value
        }))
        // console.log(email, password);
    };

    // user sign in 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // check if user exist
            if (userCredential.user) {
                console.log('user logged in');
                navigate('/');
            }


        } catch (err) {
            console.log(err.message);
            toast.error('invalid email or password, please check again', {
                autoClose: 3000,
            })
        }
    };

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader"> welcome back</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className='emailInput'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={changeHandle}
                    />
                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={changeHandle}
                        />

                        <img className='showPassword'
                            src={visibilityIcon}
                            alt="show password"
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password
                    </Link>

                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>

                {/* google oAuth */}
                <QAuth />

                <Link to='/sign-up' className='registerLink'>
                    Sign Up Instead
                </Link>
            </div>
        </>
    )
}

export default SignIn