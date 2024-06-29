// import React, { useState } from 'react';
// import axios from 'axios';
// import prediction_css from './Prediction.css';


// function Prediction() {
//   const [catalogNumber, setCatalogNumber] = useState('');
//   const [predictionResult, setPredictionResult] = useState([]);
//   const [error, setError] = useState('');

//   // const navigate = useNavigate();

//   const handleCatalogNumberChange = (e) => {
//     setCatalogNumber(e.target.value);
//   };
  

//   const handlePredictClick = async () => {
//     setPredictionResult([])
//     setError('');
//     try {
//       console.log('Sending request with catalog number:', catalogNumber);
//       const response = await axios.post('http://localhost:5000/predict', {
//         catalog_number: catalogNumber
//       });
//       console.log('Response:', response.data);
//       setPredictionResult(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Error fetching data. Please try again later.');
//       setPredictionResult([]);
//     }
// };

//   return (
//     <div className="prediction_page_layout">
//       {/* <div className="back-button" onClick={handleBackClick}>
//                 &lt; Back
//       </div> */}
//       <h1>Predict quantities to order for next month</h1>
//       <div className="Predict">
//         <h3>Please enter catalog number</h3>
//         <label htmlFor="catalogNumber">Catalog Number:</label>
//         <input
//           type="text"
//           id="catalogNumber"
//           value={catalogNumber}
//           onChange={handleCatalogNumberChange}
//         />
//         <button onClick={handlePredictClick}>Predict</button>
//       </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <h2>Prediction Results</h2>
//       {predictionResult.length === 0 ? (
//         <p></p>
//       ) : (
//       <table>
//         <thead>
//           <tr>
//             <th>Catalog Number</th>
//             {/* <th>Product Name</th> */}
//             <th>Quantity to Order</th>
//             <th>Product Color</th>
//             <th>Product Size</th>
//           </tr>
//         </thead>
//         <tbody>
//           {predictionResult.map(item => (
//             <tr key={item.catalog_number}>
//               <td>{item.catalog_number}</td>
//               {/* <td>{item.product_name}</td> */}
//               <td>{item.quantity_to_order}</td>
//               <td>{item.product_color}</td>
//               <td>{item.product_size}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       )}
//     </div>
//   );
// }

// export default Prediction;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Prediction.css'; // Ensure you import the CSS file

const Prediction = () => {
  const [catalogNumber, setCatalogNumber] = useState('');
  const [predictionResult, setPredictionResult] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCatalogNumberChange = (e) => {
    setCatalogNumber(e.target.value);
  };

  const handlePredictClick = async () => {
    setPredictionResult([]);
    setError('');
    try {
      console.log('Sending request with catalog number:', catalogNumber);
      const response = await axios.post('http://localhost:5000/predict', {
        catalog_number: catalogNumber
      });
      console.log('Response:', response.data);
      setPredictionResult(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setPredictionResult([]);
    }
  };

  const handleBackClick = () => {
    navigate('/sales-analysis'); // Adjust the navigation as needed
  };

  return (
    <div className="prediction-page">
      <div className="back-button" onClick={handleBackClick}>
        &lt; Back
      </div>
      <h1 className="title">Predict Quantities to Order</h1>
      <div className="prediction-form-container">
        <h3>Please enter catalog number</h3>
        <label htmlFor="catalogNumber">Catalog Number:</label>
        <input
          type="text"
          id="catalogNumber"
          value={catalogNumber}
          onChange={handleCatalogNumberChange}
        />
        <button onClick={handlePredictClick}>Predict</button>
      </div>

      {error && <p className="error">{error}</p>}

      <h2 className="subtitle">Prediction Results</h2>
      <div className='table-container'>
        {predictionResult.length === 0 ? (
          <p>No prediction results available.</p>
        ) : (
            <table>
              <thead>
                <tr>
                  <th>Catalog Number</th>
                  <th>Product Name</th>
                  <th>Quantity to Order</th>
                  <th>Product Color</th>
                  <th>Product Size</th>
                </tr>
              </thead>
              <tbody>
                {predictionResult.map(item => (
                  <tr key={item.catalog_number}>
                    <td>{item.catalog_number}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity_to_order}</td>
                    <td>{item.product_color}</td>
                    <td>{item.product_size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      )}
      </div>
    </div>
  );
};

export default Prediction;

