import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../component/Spinner';

const ListingPage = () => {
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        regularPrice: 0,
        discounted: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    });

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, useRef: user.uid })
                } else {
                    navigate('/sign-in');
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>ListingPage</div>
    )
}

export default ListingPage