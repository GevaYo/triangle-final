

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ParetoForm from './ParetoForm .js';
// import ParetoTable from './ParetoTable.js';
// import axios from 'axios';
// import './ParetoAnalysisPage.css';

// const ParetoAnalysisFormPage = () => {
//     const [results, setResults] = useState([]);
//     const [queryParams, setQueryParams] = useState({});
//     const navigate = useNavigate();

//     const handleBackClick = () => {
//         navigate('/sales-analysis');
//     };

//     const handleDownloadClick = () => {
//         const { start_date, end_date, criterion, percentage } = queryParams;
//         const url = `http://localhost:3001/pareto/analysis/download?start_date=${start_date}&end_date=${end_date}&criterion=${criterion}&percentage=${percentage}`;
//         window.open(url, '_blank');
//     };

//     return (
//         <div className='pareto-analysis-page'>
//             <div className="back-button" onClick={handleBackClick}>
//                 &lt; Back
//             </div>
//             <h1 className="title">Pareto Analysis</h1>
//             <ParetoForm setResults={setResults} setQueryParams={setQueryParams} />
//             {results.length > 0 && (
//                 <>
//                     <ParetoTable results={results} />
//                     <button onClick={handleDownloadClick} className="download-button">Download CSV</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ParetoAnalysisFormPage;


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
        const url = `http://localhost:3001/pareto/analysis/download?start_date=${start_date}&end_date=${end_date}&criterion=${criterion}&percentage=${percentage}`;
        window.open(url, '_blank');
    };

    console.log("Query Params:", queryParams);  // Add this log
    console.log("Results:", results);  // Add this log

    return (
        <div className='pareto-analysis-page'>
            <div className="back-button" onClick={handleBackClick}>
                &lt; Back
            </div>
            <h1 className="title">Pareto Analysis</h1>
            <ParetoForm setResults={setResults} setQueryParams={setQueryParams} />
            {results.length > 0 && (
                <>
                    <ParetoTable results={results} />
                    <button onClick={handleDownloadClick} className="download-button">Download CSV</button>
                </>
            )}
        </div>
    );
};

export default ParetoAnalysisFormPage;
