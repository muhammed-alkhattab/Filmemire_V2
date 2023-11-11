import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css'


const FeaturedMovie = ({ movie }) => {
   
   
    if (!movie) return null;

    // console.log('movie',movie);
    return (
        <Box component={Link} to={`/movie/${movie.id}`} className='featuredCardContainer'>
            <Card className='card' >
                <CardMedia
                    media="picture"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    title={movie.title}
                    className='cardMedia'
                />
                <Box padding="20px">
                    <CardContent className='cardContent' >
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Box display="flex" align="center">
                            <Rating readOnly value={movie.vote_average / 2}></Rating>
                            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{movie?.vote_average}/10 </Typography>
                        </Box>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default FeaturedMovie;