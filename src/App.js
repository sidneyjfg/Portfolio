import { useTranslation } from 'react-i18next';
import { useLocation, BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect, React } from 'react';
import Logo from './img/sjTransparent.png';
import Home from './components/Home.js';
import About from './components/About.js';
import Project from './components/Project.js';
import APIPlayground from './components/APIPlayground';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Coloque o Router aqui no topo
  return (
    <Router>
      <header>
        <div className='nav-bar'>
          <div className='logo'>
            <img src={Logo} alt="Logo" />
          </div>
          <nav>
            <ul>
              <li>
                {/* Alterado para usar o hash que permite rolar para Home */}
                <Link to="/#Home">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/#About">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/#Projects">{t('nav.projects')}</Link>
              </li>
              <li>
                <Link to="/api-playground">{t('nav.apiPlayground')}</Link>
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

      <RoutesWithScroll />
      
      <footer className="text-center py-3 copy">
        <p>{t('footer.copyright')}</p>
      </footer>
    </Router>
  );
}

// Crie um componente para lidar com o scroll suave
function RoutesWithScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main>
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
      </Routes>
    </main>
  );
}

export default App;
