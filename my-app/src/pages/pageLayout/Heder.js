import React from 'react';
import video from '../../photos/video.mp4';
import './Heder.css';

const PageLayout = ({ children }) => {
  return (
    <div className='page_layout'>
      <header>
        <div className="video-container">
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-content">
          <p>&copy; 2024 Triangle</p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;