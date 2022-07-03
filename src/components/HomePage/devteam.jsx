import React from 'react';
import './devteam.css';
import OmarPic from '../../assets/omar-presentation.JPG';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EliePic from '../../assets/elie.jpg';

function Devteam() {
  return (
    <div className='devteam'>
      <div className='devteam__container1'>
        <h1>Meet the team</h1>
        <hr className='devteam__hr' />
      </div>
      <div className='devteam__container2'>
        <div className='devteam__card'>
          <img src={EliePic} className='devteam__logo' />
          <h3>Elie Bou Nehme</h3>
          <p>Full Stack Developer</p>
          <p>AstroLabs</p>
          <hr className='devteam__hr' />
          <div className='devteam__footer'>
            <a
              className='devteam__anchor'
              href='https://github.com/eliebn147/'
              target='_blank'
            >
              <GitHubIcon />
            </a>
            <a
              className='devteam__anchor'
              href='https://www.linkedin.com/in/elie-bou-nehme/'
              target='_blank'
            >
              <LinkedInIcon />
            </a>
            <a
              className='devteam__anchor'
              href='https://eliebn.netlify.app/'
              target='_blank'
            >
              <LanguageIcon />
            </a>
          </div>
        </div>
        <div className='devteam__card'>
          <img src={OmarPic} className='devteam__logo' />
          <h3>Omar Houssami</h3>
          <p>Full Stack Developer</p>
          <p>AstroLabs</p>
          <hr className='devteam__hr' />
          <div className='devteam__footer'>
            <a
              className='devteam__anchor'
              href='https://github.com/TshiSelle'
              target='_blank'
            >
              <GitHubIcon />
            </a>
            <a
              className='devteam__anchor'
              href='https://www.linkedin.com/in/omar-houssami-342315195/'
              target='_blank'
            >
              <LinkedInIcon />
            </a>
            <a
              className='devteam__anchor'
              href='https://omarhoussami.netlify.app/'
              target='_blank'
            >
              <LanguageIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devteam;
