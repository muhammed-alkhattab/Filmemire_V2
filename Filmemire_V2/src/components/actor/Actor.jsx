import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography  } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';


import { useGetActorDetailQuery,useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const Actors = () => {
  
  const { id } = useParams();
  
  const { data, isFetching, error } = useGetActorDetailQuery(id);
  const { data: actorMovies, isFetching: isActorsMovieFetching } = useGetMoviesByActorIdQuery( id );
  const nav = useNavigate();
console.log(id.toString());
  if (isFetching || isActorsMovieFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => nav(-1)} color="primary">Go Back</Button>
      </Box>
    );
  }

  return (
    <div style={{width:'100%' , height:'auto'}}>
        
      <Grid container sx={{maxWidth:'90%'}} marginTop={'1rem'} spacing={3} marginLeft={'1rem'}>
        <Grid item sm={12} lg={5} xl={4}>
          <img
            style={{ maxWidth:'100%',
            borderRadius: '20px',
            objectFit: 'cover',
            boxShadow: '0.5em 0.5em 1em rgb(64, 64, 70)'}}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item sx={{marginBottom:{xs:'1rem'}}} lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography yet...'}</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => nav(-1)} color="primary">Back</Button>
          </Box>
        </Grid>

      </Grid>
  
      <Box  width="100%" justifyContent={'center'} display={'flex'} flexDirection={'column'} >
        <Typography variant="h2" align="center" fontFamily={'sans-serif'} marginTop={'1rem'} gutterBottom>Related Movie For {data?.name}</Typography>
        {actorMovies
          ? <MovieList movies={actorMovies} numberOfMovies={12} />
          : <Box>Sorry, nothing is found.</Box>
        }
        
    </Box>
    </div>
  );
};

export default Actors; 