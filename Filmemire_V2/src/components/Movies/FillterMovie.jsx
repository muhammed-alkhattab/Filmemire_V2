import React from 'react'
import { Box, FormControl, Select,InputLabel,MenuItem } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenerOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import { searchDate } from '../../features/currentGenerOrCategory';
const FillterMovie = () => {
    
  return (
    <>
        <YearFilter  />
        <GenreFilter  />
      
    </>
  )
};
const YearFilter = ({ onChange }) => {
    const yearsarray = [2023, 2022, 2021, 2020,2019,2018,2017,2016,'2015',2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998];
    const {years} = useSelector((state)=>state.currentGenerOrCategory)
    const dispatch = useDispatch();
      
    const handleYearChange = (event) => {
      const year = event.target.value;
      dispatch(searchDate(year));
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={years}
            label="Year"
            onChange={handleYearChange}
          >
            {yearsarray?.map((value,i) => (
              <MenuItem value={value} key={i}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
  
  const GenreFilter = ({ onChange }) => {
    
    
    const {data} = useGetGenresQuery();
    const dispatch = useDispatch();
    
    const {genreIDOrCategoryName} = useSelector((state)=>state.currentGenerOrCategory);
    
    const handleGenreChange = (event) => {
    const genre = event.target.value;
          
    dispatch(selectGenreOrCategory(genre));
      
     
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={genreIDOrCategoryName}
            label="Genre"
            onChange={handleGenreChange}
          >
            {data?.genres.map(({id, name}) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
  
  

export default FillterMovie;
