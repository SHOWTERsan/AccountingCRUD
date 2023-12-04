import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
import BeatLoader from "react-spinners/BeatLoader";

const Floors = () => {
    const [floors, setFloors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8080/api/floors`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            setFloors(response.data);
            setIsLoading(false);
        };
        fetch();
    }, []);

    return (
        <div className="table-container">
            <table className="tableStyle">
                <thead>
                <tr>
                    <th className="tableHeaderStyle">Номер этажа</th>
                    <th className="tableHeaderStyle">Высота этажа</th>
                </tr>
                </thead>
                {
                    !isLoading &&
                    <tbody>
                        {floors.map(floor => (
                            <tr key={floor.id}>
                                <td className="tableDataStyle">{floor.id}</td>
                                <td className="tableDataStyle">{floor.height}</td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
            {isLoading &&
                <div className='loader-container'>
                    <BeatLoader color={"#123abc"} loading={isLoading} size={15} />
                </div>
            }
        </div>
    );
}

export default Floors;