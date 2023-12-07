import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import Q1 from './q1';
import Q2 from './q2';
import Q3 from './q3';
import Q4 from './q4';
import Q5 from './q5';
import Q6 from './q6';
import Q7 from './q7';
import Q8 from './q8';


const MainQueries = () => {
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
                        <Link to="/query/1" style={{textDecoration: 'none', color: 'white'}}>
                            1
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/2" style={{textDecoration: 'none', color: 'white'}}>
                            2
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/3" style={{textDecoration: 'none', color: 'white'}}>
                            3
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/4" style={{textDecoration: 'none', color: 'white'}}>
                            4
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/5" style={{textDecoration: 'none', color: 'white'}}>
                            5
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/6" style={{textDecoration: 'none', color: 'white'}}>
                            6
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/7" style={{textDecoration: 'none', color: 'white'}}>
                            7
                        </Link>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        <Link to="/query/8" style={{textDecoration: 'none', color: 'white'}}>
                            8
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const QueryComponent = () => {
    return (
        <Routes>
            <Route index element={<MainQueries />} />
            <Route path="1" element={<Q1 />} />
            <Route path="2" element={<Q2 />} />
            <Route path="3" element={<Q3 />} />
            <Route path="4" element={<Q4 />} />
            <Route path="5" element={<Q5 />} />
            <Route path="6" element={<Q6 />} />
            <Route path="7" element={<Q7 />} />
            <Route path="8" element={<Q8 />} />
        </Routes>
    );
}

export default QueryComponent;