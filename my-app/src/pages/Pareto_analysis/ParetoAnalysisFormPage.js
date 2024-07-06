import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParetoForm from './ParetoForm .js';
import ParetoTable from './ParetoTable.js';
import axios from 'axios';
import './ParetoAnalysisPage.css';

const ParetoAnalysisFormPage = () => {
    const [results, setResults] = useState([]);
    const [queryParams, setQueryParams] = useState({});
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/sales-analysis');
    };

    const handleDownloadClick = () => {
        const { start_date, end_date, criterion, percentage } = queryParams;
        const url = `http://localhost:5000/pareto/analysis/download?start_date=${start_date}&end_date=${end_date}&criterion=${criterion}&percentage=${percentage}`;
        window.open(url, '_blank');
    };

    console.log("Query Params:", queryParams); 
    console.log("Results:", results);  

    return (
        <div className='pareto-analysis-page'>
            <div className="back-button" onClick={handleBackClick}>
                Back
            </div>
            <h2>ניתוח פארטו</h2>
            <ParetoForm setResults={setResults} setQueryParams={setQueryParams} />
            {results.length > 0 ? (
                <>
                    <ParetoTable results={results} />
                    <button onClick={handleDownloadClick} className="download-button">Download CSV</button>
                </>
            ) : (
                <p className="no-results-message">לא נמצאו תוצאות</p>
            )}
        </div>
    );
};

export default ParetoAnalysisFormPage;
