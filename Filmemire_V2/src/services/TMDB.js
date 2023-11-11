/* eslint-disable valid-typeof */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Token_API = "5b515e8a1bf9a3a0a986dd06d239ba12";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjUxNWU4YTFiZjlhM2EwYTk4NmRkMDZkMjM5YmExMiIsInN1YiI6IjY0N2YyNWNiY2Y0YjhiMDBlMmQ3NTI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQTOBNBAanPkX0EB_PTff8J_MZZXJ12NO3x6chxbKuU `,
    },
  }),
  endpoints: (builder) => ({
    //Get Movies By [Type]
    getMovies: builder.query({
      query: ({ genreIDOrCategoryName, page, searchQuery ,years}) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${Token_API}`;
        }
        if (
          genreIDOrCategoryName &&
          typeof genreIDOrCategoryName === "string"
        ) {
          console.log("Cat");
          return `movie/${genreIDOrCategoryName}?page=${page}&api_key=${Token_API}`;
        }
        if (
          genreIDOrCategoryName &&
          typeof genreIDOrCategoryName === "number"
        ) {
          console.log("Gener");

          return `discover/movie?with_genres=${genreIDOrCategoryName}&page=${page}&api_key=${Token_API}`;
        }
        if (years && typeof years === "number" ) {
          console.log(years);

          return `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_year=${years}&sort_by=popularity.desc`;
        }

        return `movie/popular?page=${page}&api_key=${Token_API}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en`,
    }),
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),
    getActorDetail: builder.query({
      query: (id) => `person/${id}?api_key=${Token_API}`,
    }),

    //* Get Actor's Movies
    getMoviesByActorId: builder.query({
      query: (id) =>
        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_people=${id}`,
    }),
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${Token_API}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetActorDetailQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
