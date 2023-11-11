import {
  Typography,
  Rating,
  Button,
  Card,
  CardContent,
  Chip,
  Box,
  CircularProgress,
  ButtonGroup,
  Modal,
  Skeleton,
  CardMedia
  
} from "@mui/material";
import {
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../services/TMDB";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenerOrCategory";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function MoviePage() {
  const { id } = useParams();
  const { data, isFetching } = useGetMovieQuery(id);

  const { user } = useSelector(userSelector);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const dispatch = useDispatch();
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { isAuhtenticated } = useSelector((state) => state.user);
  console.log(data);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { pathname } = location;

  // Get the previous page URL and title
  console.log(pathname);
  const Token_API = "5b515e8a1bf9a3a0a986dd06d239ba12";
  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    try{
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/favorite?api_key=${Token_API}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);}
    catch(e){
       throw(e);
    }
  };

  const addToWatchlist = async () => {
    try{
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user.id
      }/watchlist?api_key=${Token_API}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );
    setIsMovieWatchlisted((prev) => !prev);}
    catch(e) {
      throw(e);
    }
  };

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }
  const CastSection = (
    <Box display={"inline-flex"} flexWrap={"wrap"} flexDirection={"row"}>
      {data?.credits.cast
        .slice(0, 10)
        .map(({ id, credit_id, original_name, profile_path }) => (
          <Link
            to={`/actor/${id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={id}
          >
            <Box margin={2} justifyContent={"center"} alignItems={"center"}>
              {profile_path ? (
                <Box
                  component="img"
                  height={200}
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt={original_name}
                  borderRadius={10}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={"150px"}
                  height={"200px"}
                  sx={{ borderRadius: "50px" }}
                />
              )}

              <Typography variant="subtitle1" justifyContent={"center"}>
                {original_name}
              </Typography>
            </Box>
          </Link>
        ))}
    </Box>
  );
  const FavouriteAndWatch = (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      {isAuhtenticated && (
        <ButtonGroup
          size="medium"
          variant="outlined"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            gap: "1rem",
          }}
        >
          <Button
            onClick={addToFavorites}
            endIcon={
              isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
            }
          >
            {isMovieFavorited ? "Unfavorite" : "Favorite"}
          </Button>
          <Button
            onClick={addToWatchlist}
            endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
          >
            {isMovieWatchlisted ? "Remove" : "Watchlist"}
          </Button>
          <Button endIcon={<ArrowBack />} sx={{ borderColor: "primary.main" }}>
            <Typography
              component={Link}
              to="/"
              color="inherit"
              variant="subtitle2"
              style={{ textDecoration: "none" }}
            >
              Back
            </Typography>
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
  const MovieInfo = (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontSize: { xs: 24, sm: 24, md: 50 } }}
        component="div"
      >
        {data?.original_title}
      </Typography>
      <Box display={'flex'} >
        
      <Rating  name="read-only" value={data?.vote_average / 2} readOnly />
      <Typography variant="subtitle1" color='text-secondary' marginLeft={'1rem'}>
        {data?.vote_average/2}
      </Typography>
      </Box>
      <Typography variant="subtitle1" color="text.secondary">
        {data?.release_date}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Duration: {data?.runtime} min
      </Typography>
    </Box>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        
      }}
    >
      <Card  sx={{ width: "100%",height:'auto'}} >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          position='relative'
          alignItems={"center"}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          maxWidth={"100%"}
        >
           <CardMedia
                    sx={{position:'absolute',top:0,right:0}}
                    media="picture"
                    alt={data?.title}
                    image={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                    title={data?.title}
                    className='cardMedia'
                />
          <Box
            boxShadow={'0.5em 0.5em 1em rgb(0, 0, 0)'}
            marginTop={5}
            component="img"
            maxHeight={'50dvh'}
            borderRadius={10}
            paddingLeft={2}
            paddingBottom={'1rem'}
            width={"20dvw"}
            border={"1px "}
            position='relative'
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                : "https://fillmurray.com/200/300"
            }
            alt={data?.original_title}
          />
        </Box>
        <CardContent sx={{ position: "relative", zIndex: 1 }}>
          <Box
            display={"flex"}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { sm: "space-between", xs: "center" },
              alignItems: "center",
            }}
          >
            {MovieInfo}
            {FavouriteAndWatch}
          </Box>
          {data?.genres.map(({ id, name }) => {
            return (
              <Link
                key={name}
                style={{ textDecoration: "none" }}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <Chip
                  key={name}
                  label={name}
                  variant="outlined"
                  style={{ margin: "0.5rem" }}
                />
              </Link>
            );
          })}
          <Typography variant="body1" component="p">
            {data?.overview}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "1rem 0" }}
            onClick={() => setOpen(true)}
          >
            Watch Trailer
          </Button>
          <Typography variant="h6" component="div">
            Cast & Crew
          </Typography>

          {CastSection}
        </CardContent>
      </Card>
      {data?.videos?.results.length !== 0 && (
      <Modal
        closeAfterTransition
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            style={{ width: "50%", height: "50%" }}
            
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>)};
    </div>
  );
}

export default MoviePage;
