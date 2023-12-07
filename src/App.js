import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import TableComponent from './pages/TableComponent';
import QueryComponent from './pages/QueryComponent';
import ViewComponent from './pages/ViewComponent';
const HomeButton = () => {
    let navigate = useNavigate();
    return (
        <Box position="fixed" left={5} top={15} zIndex="tooltip">
            <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
                Назад
            </Button>
        </Box>
    );
}
const HomePage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/tables" style={{ textDecoration: 'none', color: 'white' }}>
                            Таблицы
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query" style={{ textDecoration: 'none', color: 'white' }}>
                            Запросы
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/views" style={{ textDecoration: 'none', color: 'white' }}>
                            Представления
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
const App = () => {
    return (
        <Router>
            <HomeButton />

            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/tables/*" element={<TableComponent />} />
                <Route path="/query/*" element={<QueryComponent />} />
                <Route path="/views/*" element={<ViewComponent />} />
             </Routes>
        </Router>
    );
}
export default App;