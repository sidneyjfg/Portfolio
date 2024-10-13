import React from 'react';
import '../style/Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="text-center py-3 copy">
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;
