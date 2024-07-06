import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParetoForm from './ParetoForm.js';
import ParetoTable from './ParetoTable.js';
import './ParetoAnalysisPage.css';

const ParetoAnalysisPage = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/sales-analysis');
    };

    return (
        <div className='pareto-analysis-page'>
            <div className="back-button" onClick={handleBackClick}>
                Back
            </div>
            <div className='pareto_container'>
                <h1 className="title">Pareto Analysis</h1>
                <ParetoForm setResults={setResults} />
                {results.length > 0 && <ParetoTable results={results} />}
            </div>
        </div>
    );
};

export default ParetoAnalysisPage;
