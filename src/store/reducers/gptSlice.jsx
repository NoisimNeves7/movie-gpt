import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value:false
}

const gptSlice = createSlice({
    name:'gpt',
    initialState,
    reducers:{
        toggleGptSearchView:(state)=>{
            state.value = !state.value
        }
    }
})

export const {toggleGptSearchView} = gptSlice.actions
export default gptSlice.reducer