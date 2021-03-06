import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../component/Spinner';
import ListingItem from '../component/ListingItem';

const Category = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                //get reference
                const listingsRef = collection(db, 'listings');

                // create query                                 
                const q = query(
                    listingsRef,
                    // categoryName = come from the url param/app.js
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // execute query
                const querySnap = await getDocs(q);

                const listings = [];

                querySnap.forEach((doc) => {
                    // console.log(doc.data());
                    // adding to the listings array 
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (err) {
                console.log(err);
                toast.error('could not fetch listings')
            }
        }

        fetchListing()

    }, [params.categoryName]);

    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ?
                        'Places for rent'
                        : 'Places for sale'}
                </p>
            </header>
            {loading ? (<Spinner />) :
                listings && listings.length > 0 ? (
                    <>
                        <main>
                            <ul className='categoryListings'>
                                {listings.map((listing) => (
                                    // <h3 key={listing.id}>{listing.data.name}</h3>
                                    <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                                ))}
                            </ul>
                        </main>
                    </>
                ) : (
                    <p>No listings for {params.categoryName}</p>

                )}
        </div>
    )
}

export default Category