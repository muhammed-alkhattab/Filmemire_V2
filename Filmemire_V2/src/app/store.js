import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tmdbApi } from '../services/TMDB'
import  genreOrCategoryReducer  from '../features/currentGenerOrCategory'
import  UserReducer  from '../features/auth'
import MovieRducer from '../features/MovieSlice'
 const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenerOrCategory : genreOrCategoryReducer,
    user : UserReducer,
    movies:MovieRducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})
setupListeners(store.dispatch)
export default store
