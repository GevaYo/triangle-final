// import React from 'react';


// const ParetoTable = ({ results }) => {
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Product Name</th>
//                     <th>Total Quantity</th>
//                     <th>Total Sales</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {results.map((row, index) => (
//                     <tr key={index}>
//                         <td>{row.product_name}</td>
//                         <td>{row.total_quantity}</td>
//                         <td>{row.total_sales}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default ParetoTable;


import React from 'react';

const ParetoTable = ({ results }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Total Quantity</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
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
