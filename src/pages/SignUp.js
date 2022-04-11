import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import QAuth from '../component/QAuth';


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData

    const navigate = useNavigate();

    const changeHandle = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value

        }))
    };

    // register user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // function from firebase
            // --user auth--
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: name,
            });
            // --save to db--
            // copy the data from formData state (name,email,password);
            const formDataCopy = { ...formData };
            // delete the password,so the password dont get submitted to db.
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            //setDoc update the db with all those parameters: db from firebase.config, 'users'=collection name, user.id=userCredential, formDataCopy
            await setDoc(doc(db, "users", user.uid), formDataCopy);


            navigate('/');
        } catch (err) {
            console.log(err.message);
            toast.error('Invalid name, email or password,please check again ', {
                autoClose: 3000,
            })
        }
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader"> welcome back</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='nameInput'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={changeHandle}
                    />
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

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>

                {/* google oAuth */}
                <QAuth />

                <Link to='/sign-in' className='registerLink'>
                    Sign In Instead
                </Link>
            </div>
        </>
    )
}

export default SignUp

