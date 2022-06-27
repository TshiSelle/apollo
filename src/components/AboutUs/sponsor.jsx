import React from 'react';
import AstroLogo from '../../assets/astrolabsHorz.png';
import './sponsor.css'

function Sponsor() {
    return ( <div className="sponsor">
         <div className='sponsor__container'>
        <h1>Sponsored By</h1>
        <hr className='sponsor__hr'/>
        </div>
        <div className='sponsor__body'>
            <img className='sponsor__logo' src={AstroLogo} />
        <p className='sponsor__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
    </div> );
}

export default Sponsor;