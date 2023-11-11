import React from 'react';
import { Typography, Grow, Tooltip , Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import './index.css';

// Lazy load the Movie component


const Movie = ({ movie, i }) => {
  return (
    <Grid xs={12} sm={6} md={4} lg={4} xl={4} key={i}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          style={{
            textDecoration: 'none',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '1rem',
          }}
          className="link"
          to={`/movie/${movie.id}`}
        >
          
            {movie.poster_path ? (
                
              <Tooltip disableTouchListener title={`${movie.title} `}>
                 
                 <img
                  className="image"
                  style={{ borderRadius: '50px' }}
                  alt={movie.title}
                  loading='eager'
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  
                /> 
              
              
              </Tooltip>
              
            ) : (
              <Skeleton variant="rectangular" width="200px" height="300px" sx={{ borderRadius: '50px' }} />
            )}
          

          <Typography
            variant="h5"
            sx={{
              textOverflow: 'ellipsis',
              width: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginTop: '10px',
              marginBottom: 0,
              textDecoration: 'none',
              color: 'black',
              textAlign: 'center',
            }}
          >
            {movie.title}
          </Typography>

          {/*<Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
        </Tooltip>*/}
        </Link>
      </Grow>
    </Grid>
  );
};



export default Movie;