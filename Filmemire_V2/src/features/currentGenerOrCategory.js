import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: "genreOrCategory",
    initialState:{
        genreIDOrCategoryName: '',
        page : 1,
        searchQuery : '',
        years : undefined ,
    },
    reducers:{
        selectGenreOrCategory:(state,action) =>{
            state.genreIDOrCategoryName = action.payload;
            state.searchQuery ='';
            console.log(action.payload)
        },
        searchMovie:(state,action) =>{
            state.searchQuery = action.payload;
            
        },
        searchDate:(state,action) =>{
            state.years=action.payload;
            state.searchQuery ='';
            state.genreIDOrCategoryName='';
        }

    },
   
})

export const {selectGenreOrCategory,searchMovie,searchDate} = genreOrCategory.actions;
export default genreOrCategory.reducer;