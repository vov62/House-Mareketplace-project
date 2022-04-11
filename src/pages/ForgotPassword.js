import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email)
            toast.success('Email was send')
        } catch (err) {
            toast.error('could not reset email')
        }

    };

    return (
        <div className='pageContainer'>
            <header>
                <p className="pageHeader">
                    Forgot Password
                </p>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className='emailInput'
                        id="email" placeholder='Email'
                        value={email}
                        onChange={handleChange}
                    />
                    <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>

                    <div className="signInBar">
                        <div className="signInText">Send Reset Link</div>
                        <button className='signInButton'>
                            <ArrowRightIcon fill='#fff' width='44px' height='44px' />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword