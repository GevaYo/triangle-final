import React from 'react';

const VariationTable = ({ results }) => {
    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Base Product</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Total Quantity</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.base_product}</td>
                            <td>{result.color}</td>
                            <td>{result.size}</td>
                            <td>{result.total_quantity}</td>
                            <td>{result.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VariationTable;
