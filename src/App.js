import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Logo from './img/sjTransparent.png';
import Home from './components/Home.js';
import About from './components/About.js';
import Project from './components/Project.js';
import APIPlayground from './components/APIPlayground';
import JSONConverter from './components/JSONConverter'; // Importa o JSON Converter
import './App.css';

function App() {
  const isProduction = process.env.NODE_ENV === 'production';
  const basename = isProduction ? '/Portfolio' : '/';

  return (
    <Router basename={basename}>
      <RoutesWithScroll />
    </Router>
  );
}

function RoutesWithScroll() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    const sections = ['Home', 'About', 'Projects'];
    const offsets = sections.map(section => {
      const el = document.getElementById(section);
      return el ? el.getBoundingClientRect().top : null;
    });
  
    const index = offsets.findIndex(offset => offset && offset < window.innerHeight / 2 && offset > 0);
  
    if (index !== -1) {
      const currentSection = sections[index].toLowerCase();
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    } else if (window.scrollY === 0) {
      if (activeSection !== 'home') {
        setActiveSection('home');
      }
    }
  }, [activeSection]);
  
  useEffect(() => {
    // Verificar se há uma query string "path"
    const queryParams = new URLSearchParams(window.location.search);
    const path = queryParams.get('path');
    if (path) {
      // Navegar para a rota especificada na query string
      navigate(path, { replace: true });
    }
  }, [navigate]);
  
  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location, handleScroll]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveSection('home');
  };

  const handleSectionClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(section);
  };

  return (
    <>
      <header>
        <div className='nav-bar'>
          <div className='logo'>
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className={activeSection === 'home' ? 'active-link' : ''}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <a
                  href="#About"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick('About');
                  }}
                  className={activeSection === 'about' ? 'active-link' : ''}
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#Projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick('Projects');
                  }}
                  className={activeSection === 'projects' ? 'active-link' : ''}
                >
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <Link
                  to="/api-playground"
                  onClick={() => setActiveSection('api-playground')}
                  className={activeSection === 'api-playground' ? 'active-link' : ''}
                >
                  {t('nav.apiPlayground')}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="language-switch">
            <button
              onClick={() => changeLanguage('en')}
              className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('pt')}
              className={`lang-btn ${i18n.language === 'pt' ? 'active' : ''}`}
            >
              Português
            </button>
          </div>
        </div>
      </header>

      <main>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={500}
            classNames="fade"
          >
            <Routes>
              <Route path="/" element={(
                <>
                  <section id="Home">
                    <Home />
                  </section>
                  <section id="About">
                    <About />
                  </section>
                  <section id="Projects">
                    <Project />
                  </section>
                </>
              )} />
              <Route path="/api-playground" element={<APIPlayground />} />
              {/* Rota para JSON Converter */}
              <Route path="/json-converter" element={<JSONConverter />} />
              </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>

      <footer className="text-center py-3 copy">
        <p>{t('footer.copyright')}</p>
      </footer>
    </>
  );
}

export default App;
