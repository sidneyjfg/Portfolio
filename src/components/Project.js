import React from 'react';
import './Project.css'; // Certifique-se de ajustar o CSS para os novos estilos
import { useTranslation } from 'react-i18next';
import projectData from './projectData.js'; // Vamos usar uma estrutura de dados para os projetos

function Projects() {
  const { t } = useTranslation(); // Hook de tradução

  return (
    <section className="project-section">
      <h2 className="heading">{t('projects.heading')}</h2>
      <div className="projects-container">
        {projectData.map((project) => (
          <div className="project-card" key={project.id}>
            <h3>{t(`projects.${project.id}.title`)}</h3>
            <p>{t(`projects.${project.id}.description`)}</p>
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <div key={index} className="tech-icon" title={tech.name}>
                  {tech.icon}
                </div>
              ))}
            </div>
            {/* Botão para GitHub */}
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="github-button"
            >
              {t('projects.githubButton')} {/* Chave geral para todos os projetos */}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
