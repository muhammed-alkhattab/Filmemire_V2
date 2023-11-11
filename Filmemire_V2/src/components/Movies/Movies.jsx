/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { useGetMoviesQuery } from "../../services/TMDB";

import MovieList from "../MovieList/MovieList";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import FillterMovie from "./FillterMovie";
import { useDispatch } from "react-redux";
import { fetchMoviesSuccess } from "../../features/MovieSlice";
import FeaturedMovie from "./FeaturedMovie";
const Movies = () => {
  const { genreIDOrCategoryName,searchQuery,years } = useSelector(
    (state) => state.currentGenerOrCategory
  );
 
  const [page, setPage] = React.useState(1);
    
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIDOrCategoryName,
    page,
    searchQuery,
    years
  });
  console.log(data);
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(fetchMoviesSuccess(data));
  }, [data, dispatch]);

  if (isFetching) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h2">There Was an Error !</Typography>
      </Box>
    );
  }
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <FeaturedMovie movie={data?.results[0]}/>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"space-around"}
        marginTop={"1rem"}
      >
        <FillterMovie />
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <MovieList movies={data} />
        <Stack
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingBottom={"1rem"}
        >
          <Pagination
            count={data.results.length}
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Movies;
