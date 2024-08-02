import { createSlice } from "@reduxjs/toolkit";

const storedUserData = typeof window !== "undefined" ?JSON.parse(localStorage.getItem("userData")) : null;

const storedUserId = typeof window !== "undefined" ?JSON.parse(localStorage.getItem("userId")) : null;

const userToken = typeof window !== "undefined" ?JSON.parse(localStorage.getItem("token")) : null;



const initialState = {
    userData: storedUserData,
    userId: storedUserId,
    apiToken: userToken,
    
}

const authSlice = createSlice({
    name: "storeAuth",
    initialState,
    reducers: {

        setUserDataFromApi: (state, action) => {
            state.userData = action.payload;
        },
        setToken: (state, action) => {
            state.apiToken = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        logout: (state) => {
            state.userData = null;
            state.apiToken = null;
            state.userId = null;
        },
        
    }

});


export const { setUserDataFromApi, setToken, setUserId, logout, getUserProfile} = authSlice.actions;

export default authSlice.reducer;
