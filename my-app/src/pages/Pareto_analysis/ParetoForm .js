import React, { useState } from 'react';
import axios from 'axios';

const ParetoForm = ({ setResults, setQueryParams }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [criterion, setCriterion] = useState('total_sales');
    const [percentage, setPercentage] = useState(80);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setQueryParams({ start_date: startDate, end_date: endDate, criterion, percentage });
        try {
            const response = await axios.get('http://localhost:5000/pareto/analysis', {
                params: { start_date: startDate, end_date: endDate, criterion, percentage }
            });
            console.log("Pareto Analysis Response:", response.data); 
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching Pareto analysis:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='item_variation'>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className='item_variation'>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className='item_variation'>
                <label>Crterion:</label>
                <select value={criterion} onChange={(e) => setCriterion(e.target.value)}>
                    <option value="total_sales">Total Sales</option>
                    <option value="total_quantity">Total Quantity</option>
                </select>
            </div>
            <div className='item_variation'>
                <label>Percentage:</label>
                <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} required />
            </div>
            <button type="submit">Analyze</button>
        </form>
    );
};

export default ParetoForm;

