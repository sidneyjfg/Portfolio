import React, { useEffect } from 'react';
import './Home.css';
import Typed from 'typed.js'; // Import Typed.js
import { useTranslation } from 'react-i18next';
import curriculum from '../doc/curriculumSidney.pdf';

function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    const typed = new Typed('#element', {
      strings: [t('home.role.backend'), t('home.role.frontend')],
      typeSpeed: 50,
      loop: true
    });

    return () => typed.destroy();
  }, [t]); // Dependendo do hook para detectar mudanças de idioma

  return (
    <div className='Home' id="Home">
      <div className='home-content'>
        <h3>{t('home.greeting')}</h3>
        <h1>{t('home.name')}</h1>
        <h3>{t('home.intro')} <span id='element'></span></h3>
        <p>{t('home.description')}</p>
        <div className='home-sci'>
          <a href='https://www.instagram.com/sidneyjfg/'><i className='bx bxl-instagram'></i></a>
          <a href='https://wa.link/sjpipp'><i className='bx bxl-whatsapp'></i></a>
          <a href='https://github.com/sidneyjfg'><i className='bx bxl-github'></i></a>
          <a href='https://www.linkedin.com/in/sidneyjunio/'><i className='bx bxl-linkedin'></i></a>
        </div>
        <a href={curriculum} target='_blank' rel="noreferrer" className='btn-more'>
          <i className='bx bx-download'></i> {t('home.downloadButton')}
        </a>
      </div>
    </div>
  );
}

export default Home;
