// Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaPhone } from 'react-icons/fa';
import './styles.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container py-3">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <span className="copyright">©Veterinaria 2024</span>
          </div>
          
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <a href="tel:0810-888-1234" className="phone-link">
              <FaPhone className="me-2" />
              0810-888-1234
            </a>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="social-links">
              <span className="me-2">Seguinos en</span>
              <div className="d-inline-block">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };