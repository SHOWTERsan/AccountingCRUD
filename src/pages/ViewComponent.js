import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Button, Grid, Box } from '@mui/material';
import V1 from './v1';
import V2 from './v2';
import V3 from './v3';
import V4 from './v4';
import V5 from './v5';


const MainViews = () => {
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
            </Grid>
        </Box>
    );
}

const ViewComponent = () => {
    return (
        <Routes>
            <Route index element={<MainViews />} />
            <Route path="1" element={<V1 />} />
            <Route path="2" element={<V2 />} />
            <Route path="3" element={<V3 />} />
            <Route path="4" element={<V4 />} />
            <Route path="5" element={<V5 />} />
        </Routes>
    );
}

export default ViewComponent;