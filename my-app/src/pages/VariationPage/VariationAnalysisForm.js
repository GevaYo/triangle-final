// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VariationAnalysisForm = ({ setResults }) => {
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/variation/products');
//                 console.log('Products fetched:', response.data);  
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.get('http://localhost:5000/variation/analysis', {
//                 params: { start_date: startDate, end_date: endDate, product_name: selectedProduct }
//             });
//             console.log('Analysis results:', response.data);  
//             setResults(response.data);
//         } catch (error) {
//             console.error('Error fetching variation analysis:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
            
//             <div className='item_variation'>
//                 <label>Product:</label>
//                 <select  className='product1'value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
//                     <option value="">Select a product</option>
//                     {products.map((product) => (
//                         <option key={product} value={product}>{product}</option>
//                     ))}
//                 </select>
//             </div>
//             <div className='item_variation'>
//                 <label>Start Date:</label>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//             </div>
//             <div className='item_variation'>
//                 <label>End Date:</label>
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
//             </div>
//             <button type="submit">Analyze</button>
//         </form>
//     );
// };

// export default VariationAnalysisForm;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VariationAnalysisForm = ({ setResults }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/variation/products');
                console.log('Products fetched:', response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Clear any previous messages
        try {
            const response = await axios.get('http://localhost:5000/variation/analysis', {
                params: { start_date: startDate, end_date: endDate, product_name: selectedProduct }
            });
            console.log('Analysis results:', response.data);
            if (response.data.length === 0) {
                setMessage('No variations found.');
            }
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching variation analysis:', error);
            setMessage('Error fetching variation analysis.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='item_variation'>
                    <label>Product:</label>
                    <select className='product1' value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>
                </div>
                <div className='item_variation'>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div className='item_variation'>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <button type="submit">Analyze</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VariationAnalysisForm;
