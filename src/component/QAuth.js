import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

const QAuth = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const googleLoginLink = async () => {

        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check if user already exists in firestore, if not we want to add it.
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            // if user doesn't exists then create user 
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/');

        } catch (err) {
            toast.error('authorize with google failed')
        }
    };

    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
            <button className="socialIconDiv">
                <img className='socialIconImg' src={googleIcon} alt="google" onClick={googleLoginLink} />
            </button>
        </div>
    )
}

export default QAuth