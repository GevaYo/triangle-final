import React from 'react';

const ParetoTable = ({ results }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Catalog Number</th>
                        <th>Product Name</th>
                        <th>Total Quantity</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td>{result.catalog_number}</td>
                            <td>{result.product_name}</td>
                            <td>{result.total_quantity}</td>
                            <td>{result.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParetoTable;

