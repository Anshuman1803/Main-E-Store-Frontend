import React from 'react'

function Loader() {
    return (
        <div className='loaderContainer'>
            <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <circle id="c" fill="none" strokeWidth="4" strokeLinecap="round" stroke="tomato" cx="45" cy="45" r="43" />
            </svg>
        </div>
    )
}

export default Loader
