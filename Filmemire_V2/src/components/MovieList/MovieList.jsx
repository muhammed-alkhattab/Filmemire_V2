import React from 'react'
import Grid from '@mui/material/Grid';
import  {Box}  from '@mui/material';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
    const startFrom = excludeFirst ? 1 : 0;
  return (
    <Box sx={{ flexGrow: 1}}>
    <Grid  container  display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} sx={{justifyContent:{xs:'center'}}} overflow={'auto'} >
    
     {movies.results.slice(startFrom,numberOfMovies).map((movie,i)=>(
      <Box margin={2} key={i}>
   {/* <LazyLoad  key={i}  offset={500} threshold={0.90} onContentVisible={() => {console.log('loaded!')}}> */}
            
            <Movie  movie={movie} key={i} i={i}/>
            
     </Box>
     
     ))}
     
    </Grid>
  </Box>
  )
}

export default MovieList
