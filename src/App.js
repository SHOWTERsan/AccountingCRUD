import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import Corps from './pages/Corps';
import Departments from './pages/Departments';
import Rooms from './pages/Rooms';
import Faculties from './pages/Faculties';
import Floors from './pages/Floors';

const HomeButton = () => {
    const location = useLocation();
    if (location.pathname !== '/') {
        return (
            <Box position="fixed" left={5} top={15} zIndex="tooltip">
                <Button variant="outlined" color="primary">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                </Button>
            </Box>
        );
    }
    return null;
}

function App() {
    return (
        <Router>
            <HomeButton />
            <Routes>
                <Route path="/" element={
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
                                    <Link to="/corps" style={{textDecoration: 'none', color: 'white'}}>
                                        Корпуса
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <Link to="/departments" style={{textDecoration: 'none', color: 'white'}}>
                                        Кафедры
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <Link to="/faculties" style={{textDecoration: 'none', color: 'white'}}>
                                        Факультеты
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <Link to="/rooms" style={{textDecoration: 'none', color: 'white'}}>
                                        Помещения
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <Link to="/floors" style={{textDecoration: 'none', color: 'white'}}>
                                        Этажи
                                    </Link>
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>}
                />
                <Route path="/corps" element={<Corps />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/faculties" element={<Faculties />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/floors" element={<Floors />} />
            </Routes>
        </Router>
    );
}

export default App;