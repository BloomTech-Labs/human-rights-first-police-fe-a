import React from 'react';

import './Footer.css';
import bloomtechlogo from '../../assets/BloomTechAssets/BIT_Logo_Stacked_White.png';
import bwlogo from '../../assets/blue-witness1.png';
import hrflogo from '../../assets/hrf-logo1.2.png';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="top-container">
        <div className="office-contact">
          <h3>New York · Washington · Los Angeles</h3>
          <p>Human Rights First, 75 Broad St, 31st Floor, New York, NY 10004</p>
          <p>For Media Inquiries call 202-370-3323</p>
          <p>
            Human Rights First is a nonpartisan, 501(c)(3), international human
            rights organization based in New York and Washington, DC. We do not
            favor or oppose any candidate for public office.
          </p>
        </div>
        <div className="bloomtech-logo-container">
          <a href="https://www.humanrightsfirst.org">
            <img className="hrflogo" src={hrflogo} alt="HRF footer logo" />
          </a>
          <a href="https://www.bloomtech.com/" target="_blank" rel="noreferrer">
            <img
              className="bloomtech-logo"
              src={bloomtechlogo}
              alt="built by bloomtech logo"
            />
          </a>
        </div>
        <div className="footer-links-container">
          <img className="blue-logo" alt="Blue Witness logo" src={bwlogo} />
        </div>
      </div>
      <div className="copyright-container">
        <p>Human Rights First &copy;2021</p>
      </div>
    </div>
  );
};

export default Footer;
