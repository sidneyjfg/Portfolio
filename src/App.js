import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Importando react-scroll para navegação suave
import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Importando para transições
import Logo from './img/sjTransparent.png';
import Home from './components/Home.js';
import About from './components/About.js';
import Project from './components/Project.js';
import APIPlayground from './components/APIPlayground';
import './App.css';

function App() {
  return (
    <Router>
      <RoutesWithScroll />
    </Router>
  );
}

function RoutesWithScroll() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate(); // Para redirecionar
  const [activeSection, setActiveSection] = useState('home');

  // Função para detectar a seção ativa com base na rolagem
  const handleScroll = () => {
    const sections = ['Home', 'About', 'Projects'];
    const offsets = sections.map(section => {
      const el = document.getElementById(section);
      return el ? el.getBoundingClientRect().top : null;
    });

    if (window.scrollY === 0) {
      setActiveSection('home');
      return;
    }

    const index = offsets.findIndex(offset => offset > 0 && offset < window.innerHeight / 2);

    if (index !== -1) {
      setActiveSection(sections[index].toLowerCase());
    }
  };

  // Adiciona o listener de rolagem
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para mudar o idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Função para ir para o topo da página e definir a seção Home
  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/"); // Se estiver fora da página principal, redireciona para Home
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Se já estiver na home, apenas rola suavemente para o topo
    }
    setActiveSection('home'); // Define a seção ativa como Home
  };

  const handleSectionClick = (section) => {
    if (location.pathname !== "/") {
      navigate("/"); // Redireciona para Home se não estiver na rota principal
    }
    setActiveSection(section); // Define a seção ativa
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
                {/* Usando Link para garantir a navegação entre páginas */}
                <Link
                  to="/"
                  onClick={scrollToTop} // Função para voltar ao topo e setar Home como ativo
                  className={activeSection === 'home' ? 'active-link' : ''}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <ScrollLink
                  to="About"
                  smooth={true}
                  duration={500}
                  className={activeSection === 'about' ? 'active-link' : ''}
                  onClick={() => handleSectionClick('about')}
                >
                  {t('nav.about')}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="Projects"
                  smooth={true}
                  duration={500}
                  className={activeSection === 'projects' ? 'active-link' : ''}
                  onClick={() => handleSectionClick('projects')}
                >
                  {t('nav.projects')}
                </ScrollLink>
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
            timeout={500} // Tempo da transição (500ms)
            classNames="fade" // Nome da classe para animação
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
