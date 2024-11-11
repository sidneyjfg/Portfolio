import React from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';


const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <a href="#home">
        <img id="logo" src={require('../img/sjTransparent.png')} alt="Logo" />
      </a>

      <nav className="navbar">
        <Link to="home" smooth={true} duration={1000}>{t('nav.home')}</Link>
        <Link to="about" smooth={true} duration={1000}>{t('nav.about')}</Link>
        <Link to="service" smooth={true} duration={1000}>{t('nav.services')}</Link>
        <Link to="projects" smooth={true} duration={1000}>{t('nav.projects')}</Link>
      </nav>
    </header>
  );
};

export default Header;
