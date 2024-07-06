import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VariationAnalysisForm from './VariationAnalysisForm.js';
import VariationTable from './VariationTable.js';
import VariationCss from './VariationAnalysis.css'
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
                Back
            </div>
            <h1 className="title">ניתוח לפי ואריאציה </h1>
            <div className='variation_container'>
                    <VariationAnalysisForm setResults={setResults} />
                {results.length > 0 && (
                    <VariationTable results={results} />
                )}
            </div>

        </div>
    );
};

export default VariationAnalysisPage;

