import axios from 'axios';
import { Button, Box, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

const Q8 = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccessful, setSuccessful] = useState(false);
    const [oldFacultyId, setOldFacultyId] = useState('');
    const [newFacultyId, setNewFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/faculties')
            .then(response => {
                setFaculties(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении списка факультетов', error);
            });
    }, []);

    const updateData = () => {
        setLoading(true);
        axios.put(`http://localhost:8080/api/query/8`, {oldFacultyId, newFacultyId})
            .then(res => {
                setSuccessful(res.status === 200);
            })
            .catch(error => {
                console.error('Случилась непредвиденная ошибка!', error);
            })
            .finally(() => {
                setLoading(false);
                setOldFacultyId('');
                setNewFacultyId('');
            });
    }

    const renderStatus = () => {
        if (isLoading) {
            return "Loading...";
        }
        if (isSuccessful) {
            return "Запрос успешно выполнен";
        }
        return "Пожалуйста, нажмите кнопку для отправки запроса";
    }

    const handleOldFacultyIdChange = (event) => {
        setOldFacultyId(event.target.value);
    }

    const handleNewFacultyIdChange = (event) => {
        setNewFacultyId(event.target.value);
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <h1>Выберите факультет, который хотите заменить, и факультет, на который хотите заменить.</h1>
            <Select value={oldFacultyId} onChange={handleOldFacultyIdChange} sx={{ width: 250 }}>
                {faculties.map(faculty => (
                    <MenuItem key={faculty.id} value={faculty.id}>{faculty.name}</MenuItem>
                ))}
            </Select>
            <Select value={newFacultyId} onChange={handleNewFacultyIdChange} sx={{ width: 250 }}>
                {faculties.map(faculty => (
                    <MenuItem key={faculty.id} value={faculty.id}>{faculty.name}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" onClick={updateData} disabled={isLoading}>
                Обновить данные
            </Button>
            <p>{renderStatus()}</p>
        </Box>
    );
}

export default Q8;