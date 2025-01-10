import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import './APIPlayground.css'; // Estilos personalizados

function APIPlayground() {
  const { t } = useTranslation();

  const features = [
    {
      id: "jsonConverter",
      title: t("apiPlayground.tools.jsonConverter.title"),
      description: t("apiPlayground.tools.jsonConverter.description"),
      link: "/json-converter"
    },
    {
      id: "apiTester",
      title: t("apiPlayground.tools.apiTester.title"),
      description: t("apiPlayground.tools.apiTester.description"),
      link: "/api-playground"
    }
  ];

  return (
    <div className="api-playground">
      <h1>{t("apiPlayground.title")}</h1>
      <p>{t("apiPlayground.description")}</p>

      <div className="card-container">
        {features.map((feature) => (
          <div key={feature.id} className="card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <Link to={feature.link} className="card-link">
              {t("nav.projects")} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default APIPlayground;
