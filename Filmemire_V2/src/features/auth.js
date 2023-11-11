import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :{},
    isAuhtenticated:false,
    sessionId:''};
    const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action) =>{
            state.user = action.payload;
            state.isAuhtenticated=true;
            state.sessionId = localStorage.getItem('session_Id');
            localStorage.setItem('Account_Id', action.payload.id);
        }
    },
    });
    export const {setUser} = authSlice.actions;
    export default authSlice.reducer;
    export const userSelector = (state)=>state.user;