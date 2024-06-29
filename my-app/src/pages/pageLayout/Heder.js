// import React from 'react';
// import video from '../../photos/video.mp4';
// import './Heder.css';

// const PageLayout = ({ children }) => {
//   return (
//     <div>
//       <header>
//         <div className="video-container">
//           <video autoPlay muted loop>
//             <source src={video} type="video/mp4" />
//           </video>
//         </div>
//       </header>

//       <main>{children}</main>

//       <footer>
//         <div className="footer-content">
//           <p>&copy; 2024 Your Company Name</p>
//           <nav>
//             <ul>
//               <li><a href="#">Home</a></li>
//               <li><a href="#">About</a></li>
//               <li><a href="#">Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PageLayout;

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
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;