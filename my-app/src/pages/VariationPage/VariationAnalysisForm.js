

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VariationAnalysisForm = ({ setVariationResults }) => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [productName, setProductName] = useState('');
//     const [products, setProducts] = useState([]);
//     const [variation, setVariation] = useState('');
//     const [variations, setVariations] = useState([]);

//     useEffect(() => {
//         // Fetch the list of products to populate the dropdown
//         axios.get('http://localhost:3001/products')
//             .then(response => setProducts(response.data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);

//     const handleProductChange = (event) => {
//         setProductName(event.target.value);
//         // Fetch variations for the selected product
//         axios.get('http://localhost:3001/variation-analysis', {
//             params: { start_date: startDate, end_date: endDate, product_name: event.target.value }
//         })
//             .then(response => setVariations(response.data))
//             .catch(error => console.error('Error fetching variations:', error));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.get('http://localhost:3001/variation-sales', {
//                 params: { start_date: startDate, end_date: endDate, product_name: productName, variation: variation }
//             });
//             setVariationResults(response.data);
//         } catch (error) {
//             console.error('Error fetching variation sales:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Start Date:</label>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//             </div>
//             <div>
//                 <label>End Date:</label>
//                 <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
//             </div>
//             <div>
//                 <label>Product:</label>
//                 <select value={productName} onChange={handleProductChange} required>
//                     <option value="">Select Product</option>
//                     {products.map(product => (
//                         <option key={product} value={product}>{product}</option>
//                     ))}
//                 </select>
//             </div>
//             {variations.length > 0 && (
//                 <div>
//                     <label>Variation:</label>
//                     <select value={variation} onChange={(e) => setVariation(e.target.value)} required>
//                         <option value="">Select Variation</option>
//                         {variations.map(varItem => (
//                             <option key={varItem.catalog_number} value={varItem.catalog_number}>{varItem.catalog_number}</option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//             <button type="submit">Analyze</button>
//         </form>
//     );
// };

// export default VariationAnalysisForm;


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
//                 const response = await axios.get('http://localhost:3001/variation/products');
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
//             const response = await axios.get('http://localhost:3001/variation/analysis', {
//                 params: { start_date: startDate, end_date: endDate, product_name: selectedProduct }
//             });
//             setResults(response.data);
//         } catch (error) {
//             console.error('Error fetching variation analysis:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Product:</label>
//                 <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
//                     <option value="">Select a product</option>
//                     {products.map((product) => (
//                         <option key={product} value={product}>{product}</option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <label>Start Date:</label>
//                 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//             </div>
//             <div>
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/variation/products');
                console.log('Products fetched:', response.data);  // Add this line
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/variation/analysis', {
                params: { start_date: startDate, end_date: endDate, product_name: selectedProduct }
            });
            console.log('Analysis results:', response.data);  
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching variation analysis:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <div className='item_variation'>
                <label>Product:</label>
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
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
    );
};

export default VariationAnalysisForm;

