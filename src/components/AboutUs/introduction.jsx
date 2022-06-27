import React from 'react';
import './introduction.css';

function Introduction() {
    return ( <div className="introduction">
        <div className='introduction__container'>
        <h1>What is Apollo</h1>
        <hr className='introduction__hr'/>
        </div>
        <div className='introduction__body'>
        <p className='introduction__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div> );
}

export default Introduction;