/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {Box,Grid,Typography,CircularProgress , Stack,useTheme,Button} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../services/TMDB'
import { selectGenreOrCategory } from '../../features/currentGenerOrCategory'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
export const MovieInfo = () => {
const {id} = useParams();
const {data,isFetching} = useGetMovieQuery(id);
const theme = useTheme();
const dispatche = useDispatch();

const handlesubmit = (id)=>{
dispatche(selectGenreOrCategory(id));


}
if(isFetching){
    return(
        <Box display={'flex'} justifyContent={'center'}>
          <CircularProgress/>
        </Box>
      ) 
}
  return (
   
    <Box sx={{flexGrow:1}} paddingTop={3}>
      <Grid container   sx={{flexWrap:{sm:'wrap',md:'nowrap',lg:'nowrap'}}}>
        <Grid item display={'flex'}  >
            <Box component={'img'} borderRadius={10} width={400} height={400} boxShadow={200}  src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}>

            </Box>
           
        </Grid>
        <Grid item paddingLeft={2}>
        <Typography  variant='h2' color={'dark'} fontFamily={'fantasy'}>
                {data?.original_title} <span>({data?.release_date
})</span>
            </Typography>
            <Stack direction={'row'} >
                {data?.genres.map(({id,name})=>{
                    return(
                        <Link to={'/'} onClick={handlesubmit(id)} style={{textDecoration:'none'}}  key={id}>
                        <Typography   paddingLeft={3}    variant='overline' fontStyle={'italic'}>{name}</Typography>
                        </Link>
                    )
                   
                })}
            </Stack>
            <h3>Overview</h3>
            <Typography variant='subtitle1'>{data?.overview}</Typography>
                
        </Grid>
      </Grid>
      <h1>Top Billed Cast</h1>
      <Grid container direction={'row'} spacing={3}>
        {data?.credits.cast.slice(0,10).map(({cast_id,original_name,profile_path})=>{
            return(
                <Grid item >
                <img width={200} style={{borderRadius:'10px',boxShadow:'initial'}} height={200} src={`https://image.tmdb.org/t/p/w500/${profile_path}`}/>
                <Typography> {original_name}</Typography>
            </Grid>

            )
        })}
        
      </Grid>
    </Box>
  )
}


