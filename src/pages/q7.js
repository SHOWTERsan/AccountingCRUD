import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react';

const Q7 = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccessful, setSuccessful] = useState(false);
    const [roomId, setRoomId] = useState('');

    const updateData = () => {
        setLoading(true);
        axios.put(`http://localhost:8080/api/query/7`, {roomNumber: roomId})
            .then(res => {
                setSuccessful(res.status === 200);
            })
            .catch(error => {
                console.error('Случилась непредвиденная ошибка!', error);
            })
            .finally(() => {
                setLoading(false);
                setRoomId('');
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

    const handleRoomIdChange = (event) => {
        setRoomId(event.target.value);
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <h1>Введи номер запроса и номер кабинета, который требуется изменить.</h1>
            <TextField value={roomId} onChange={handleRoomIdChange} placeholder="Номер кабинета"/>
            <Button variant="contained" color="primary" onClick={updateData} disabled={isLoading}>
                Обновить данные
            </Button>
            <p>{renderStatus()}</p>
        </Box>
    );
}

export default Q7;