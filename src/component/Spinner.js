import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
    return (
        <div className='loadingSpinnerContainer'>
            <ClipLoader size={60} color='#14c17b' />
        </div>
    )
}

export default Spinner