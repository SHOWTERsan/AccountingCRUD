import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import Corps from './Corps';
import Departments from './Departments';
import Rooms from './Rooms';
import Faculties from './Faculties';
import Floors from './Floors';


const MainTables = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables/corps" style={{textDecoration: 'none', color: 'white'}}>
                            Корпуса
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables/departments" style={{textDecoration: 'none', color: 'white'}}>
                            Кафедры
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables/faculties" style={{textDecoration: 'none', color: 'white'}}>
                            Факультеты
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables/rooms" style={{textDecoration: 'none', color: 'white'}}>
                            Помещения
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables/floors" style={{textDecoration: 'none', color: 'white'}}>
                            Этажи
                        </Link>
                    </Button>
                </Grid>
            </Grid>

        </Box>
    );
}

const TableComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<MainTables />} />
            <Route path="corps" element={<Corps />} />
            <Route path="departments" element={<Departments />} />
            <Route path="faculties" element={<Faculties />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="floors" element={<Floors />} />
        </Routes>
    );
}

export default TableComponent;