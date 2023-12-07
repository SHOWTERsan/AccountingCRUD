import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
const DynamicTable = ({ endpoint }) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/query/${endpoint}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [endpoint]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const columns = Object.keys(data[0]);

    return (
        <table className="tableStyle">
            <thead>
            <tr>
                {columns.map(column => <th key={column} className="tableHeaderStyle">{column}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    {columns.map(column => <td key={column} className="tableDataStyle">{row[column]}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;