import React, { useState } from 'react';
import './About.css';
import imageAbout from '../img/Sidney.jpg';
import { useTranslation } from 'react-i18next';
import { FaReact, FaPython, FaDocker, FaLinux, FaJs, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiMysql } from 'react-icons/si';

function About() {
  const [activeTab, setActiveTab] = useState('skills'); // Aba inicial ativa
  const { t } = useTranslation(); // Hook de tradução

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="about" id="About">
      <div className="about-content">
        <div className="row">
          <div className="about-col-1">
            <img id="profileAbout" src={imageAbout} alt="Sidney Junio"></img>
          </div>
          <div className="about-col-2">
            <h1 className="heading">{t('about.heading')} <span>{t('about.me')}</span></h1>
            <p align="justify">
              {t('about.description')}
            </p>
            <div className="tab-titles">
              <p
                className={`tab-links ${activeTab === 'skills' ? 'active-link' : ''}`}
                onClick={() => handleTabClick('skills')}
              >
                {t('about.skillsTitle')}
              </p>
              <p
                className={`tab-links ${activeTab === 'experience' ? 'active-link' : ''}`}
                onClick={() => handleTabClick('experience')}
              >
                {t('about.experienceTitle')}
              </p>
              <p
                className={`tab-links ${activeTab === 'education' ? 'active-link' : ''}`}
                onClick={() => handleTabClick('education')}
              >
                {t('about.educationTitle')}
              </p>
            </div>

            {/* Conteúdo da aba Skills */}
            <div className={`tab-contents ${activeTab === 'skills' ? 'active-tab' : ''}`} id="skills">
              <ul>
                <li><span>{t('about.skills.app')}</span><br />{t('about.skills.appDescription')}</li>
                <li><span>{t('about.skills.backendFrontend')}</span><br />{t('about.skills.backendFrontendDescription')}</li>
                <li><span>{t('about.skills.os')}</span><br />{t('about.skills.osDescription')}</li>
                <li><span>{t('about.skills.databases')}</span><br />{t('about.skills.databasesDescription')}</li>
              </ul>

              {/* Ícones das tecnologias */}
              <div className="skills-icons">
                <FaJs size={50} color="#F7DF1E" title="JavaScript" />
                <SiTypescript size={50} color="#007ACC" title="TypeScript" />
                <FaReact size={50} color="#61DBFB" title="React" />
                <FaNodeJs size={50} color="#68A063" title="Node.js" />
                <FaPython size={50} color="#3776AB" title="Python" />
                <FaDocker size={50} color="#0db7ed" title="Docker" />
                <FaLinux size={50} color="#FCC624" title="Linux" />
                <SiMysql size={50} color="#4479A1" title="MySQL" />
              </div>
            </div>

            {/* Conteúdo da aba Experience */}
            <div className={`tab-contents ${activeTab === 'experience' ? 'active-tab' : ''}`} id="experience">
              <ul>
                <li><span>{t('about.experience.currentJob.date')}</span><br />{t('about.experience.currentJob.description')}</li>
                <li><span>{t('about.experience.webDev.date')}</span><br />{t('about.experience.webDev.description')}</li>
                <li><span>{t('about.experience.ecommerce.date')}</span><br />{t('about.experience.ecommerce.description')}</li>
              </ul>
            </div>

            {/* Conteúdo da aba Education */}
            <div className={`tab-contents ${activeTab === 'education' ? 'active-tab' : ''}`} id="education">
              <ul>
                <li><span>{t('about.education.university.date')}</span><br />{t('about.education.university.description')}</li>
                <li><span>{t('about.education.technical.date')}</span><br />{t('about.education.technical.description')}</li>
                <li><span>{t('about.education.english.date')}</span><br />{t('about.education.english.description')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
