// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import VariationAnalysisForm from './VariationAnalysisForm.js';
// import VariationTable from './VariationTable.js';
// // import './VariationAnalysisPage.css';

// const VariationAnalysisPage = () => {
//     const [variationResults, setVariationResults] = useState([]);
//     const navigate = useNavigate();

//     const handleBackClick = () => {
//         navigate('/sales-analysis');
//     };

//     return (
//         <div className='variation-analysis-page'>
//             <div className="back-button" onClick={handleBackClick}>
//                 &lt; Back
//             </div>
//             <h1 className="title">Variation Analysis</h1>
//             <VariationAnalysisForm setVariationResults={setVariationResults} />
//             {variationResults.length > 0 && <VariationTable results={variationResults} />}
//         </div>
//     );
// };

// export default VariationAnalysisPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VariationAnalysisForm from './VariationAnalysisForm.js';
import VariationTable from './VariationTable.js';
// import './VariationAnalysisPage.css';

const VariationAnalysisPage = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/sales-analysis');
    };

    return (
        <div className='variation-analysis-page'>
            <div className="back-button" onClick={handleBackClick}>
                &lt; Back
            </div>
            <h1 className="title">Variation Analysis</h1>
            <VariationAnalysisForm setResults={setResults} />
            {results.length > 0 && (
                <VariationTable results={results} />
            )}
        </div>
    );
};

export default VariationAnalysisPage;

