import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value:false,
    tmdbMovieData:null,
    gptMovieName:null ,
    searchBtnClicked:false
}

const gptSlice = createSlice({
    name:'gpt',
    initialState,
    reducers:{
        toggleGptSearchView:(state)=>{
            state.value = !state.value
        },
        addGptMovieResult:(state,action)=>{
            const {tmdbMovieData,gptMovieName} = action.payload
            state.tmdbMovieData = tmdbMovieData;
            state.gptMovieName = gptMovieName;
            
        },
        removeMovieResult:(state)=>{
            state.tmdbMovieData = null
            state.gptMovieName = null
        },
        setSearchBtnClicked:(state,action)=>{
            state.searchBtnClicked = action.payload
        }
    }
})

export const {toggleGptSearchView,addGptMovieResult,removeMovieResult,setSearchBtnClicked} = gptSlice.actions
export default gptSlice.reducer