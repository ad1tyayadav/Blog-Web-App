import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div className='logop'>
            <b className='text-2xl'>Blog</b>
            <span className='logobg text-xl'>Hub</span>
        </div>
    )
}

export default Logo