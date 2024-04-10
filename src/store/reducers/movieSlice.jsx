import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    info:null,
}

const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        addMovie:(state,action)=>{
            state.info = action.payload
        },
        removeMovie:(state)=>{
            state.info = null
        }
    }
})

export const{addMovie, removeMovie} = movieSlice.actions
export default movieSlice.reducer