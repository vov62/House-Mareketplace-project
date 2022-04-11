import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    //update user details
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });
    const [changeDetails, setChangeDetails] = useState(false);

    const { name, email } = formData;

    // Logout user
    const onLogout = () => {
        auth.signOut();
        navigate('/');
    };

    const onSubmit = async () => {
        try {

            if (auth.currentUser.displayName !== name) {
                // update display name in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                // update in firestore=db
                const user = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(user, {
                    name: name
                },
                    toast.success('name updated :)'));

            }
        } catch (err) {
            toast.error('could not update profile details')
        }
    };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    };


    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className="pageHeader">My Profile</p>
                <button className='logOut' type='button' onClick={onLogout}>
                    Logout
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p className="changePersonalDetails"
                        onClick={() => {
                            changeDetails && onSubmit()
                            setChangeDetails((prevState) => !prevState)
                        }}>
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id='name'
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            id='email'
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Profile