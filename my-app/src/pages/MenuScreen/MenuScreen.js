// import React from 'react';
// import './MenuScreen.css';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../photos/logo.jpeg'; 
// import video from '../../photos/video.mp4'; 

// const MenuScreen = () => {
//   const navigate = useNavigate();

//   const handleMenuClick = (option) => {
//     switch (option) {
//       case 'customerDateManagement':
//         navigate('/club-management');
//         break;
//       case 'clubRegistration':
//         navigate('/club-registration');
//         break;
//       case 'inventoryManagement':
//         navigate('/inventory-management');
//         break;
//       case 'SalesAnalysis':
//         navigate('/sales-analysis');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="menu-screen">
//       <div className="menu-container">
//         <img src={logo} alt="Triangle Analytics Logo" className="logo" />
//         <h2>בחירת תפריט</h2>
//         <button onClick={() => handleMenuClick('SalesAnalysis')}>
//           ניתוח מכירות
//         </button>
//         <button onClick={() => handleMenuClick('customerDateManagement')}>
//           ניהול מועדון לקוחות
//         </button>
//         <button onClick={() => handleMenuClick('clubRegistration')}>
//           רישום לקוח חדש לדף המועדון
//         </button>
//         <button onClick={() => handleMenuClick('inventoryManagement')}>
//           ניהול מלאי
//         </button>
//         <button onClick={() => handleMenuClick('inventoryManagement')}>
//           צפייה בדו"חות
//         </button>
//       </div>
//       <footer>
//         <video className="video-footer" src={video} autoPlay muted loop />
//       </footer>
//     </div>
//   );
// };

// export default MenuScreen;





// // import React from 'react';
// // import './MenuScreen.css';
// // import { useNavigate } from 'react-router-dom';
// // import logo from './logo.jpeg';
// // import video from './photos/video.mp4';

// // const MenuScreen = () => {
// //   const navigate = useNavigate();

// //   const handleMenuClick = (option) => {
// //     switch (option) {
// //       case 'customerDateManagement':
// //         navigate('/club-management');
// //         break;
// //       case 'clubRegistration':
// //         navigate('/club-registration');
// //         break;
// //       case 'inventoryManagement':
// //         navigate('/inventory-Management');
// //       case 'SalesAnalysis':
// //         navigate('/Sales-Analysist');
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   return (
// //     <div className="menu-screen">
// //       <div className="menu-container">
// //         <img src={logo} alt="Triangle Analytics Logo" className="logo" />
// //         <h2>בחירת תפריט</h2>
// //         <button onClick={() => handleMenuClick('SalesAnalysis')}>
// //           ניתוח מכירות
// //         </button>
// //         <button onClick={() => handleMenuClick('customerDateManagement')}>
// //           ניהול מועדון לקוחות
// //         </button>
// //         <button onClick={() => handleMenuClick('clubRegistration')}>
// //           רישום לקוח חדש לדף המועדון
// //         </button>
// //         <button onClick={() => handleMenuClick('inventoryManagement')}>
// //           ניהול מלאי
// //         </button>
// //         <button onClick={() => handleMenuClick('inventoryManagement')}>
// //           צפייה בדו"חות
// //         </button>
// //       </div>
// //       <footer>
// //         <video className="video-footer" src={video} autoPlay muted loop />
// //       </footer>
// //     </div>
// //   );
// // };

// // export default MenuScreen;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuScreen.css';
import logo from '../../photos/logo.png';
import video from '../../photos/video.mp4';

const MenuScreen = () => {
  const navigate = useNavigate();

  const handleMenuClick = (option) => {
    switch (option) {
      case 'SalesAnalysis':
        navigate('/sales-Analysis');
        break;  
      case 'customerDateManagement':
        navigate('/club-management');
        break;
      // case 'clubRegistration':
      //   navigate('/club-registration');
      //   break;
      case 'inventoryManagement':
        navigate('/Prediction');
        break;
      default:
        break;
    }
  };

  return (
    <div className="menu-screen">
      <div className="menu-container">
        <img src={logo} alt="Triangle Analytics Logo" className="logo" />
        <h2>בחירת תפריט</h2>
        <button onClick={() => handleMenuClick('SalesAnalysis')}>
          ניתוח מכירות
        </button>
        <button onClick={() => handleMenuClick('customerDateManagement')}>
          ניהול מועדון לקוחות
        </button>
        {/* <button onClick={() => handleMenuClick('clubRegistration')}>
          רישום לקוח חדש לדף המועדון
        </button> */}
        <button onClick={() => handleMenuClick('inventoryManagement')}>
         חיזוי כמויות מלאי
        </button>
        {/* <button onClick={() => handleMenuClick('inventoryManagement')}>
          צפייה בדו"חות
        </button> */}
      </div>
      {/* <footer>
        <video className="video-footer" src={video} autoPlay muted loop />
      </footer> */}
    </div>
  );
};

export default MenuScreen;


