import React from 'react';
import { Typography, Box } from '@mui/material';

import Movie from '../Movie/Movie';

const RatedCards = ({ title, data }) => {
    

    return (
        <Box>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Box display="flex" flexWrap="wrap" >
                {data?.results.map((movie, i) => (
                    <Box margin={1}  key={movie.id}>
                    
                    <Movie key={movie.id} movie={movie} i={i} />
                    
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RatedCards;