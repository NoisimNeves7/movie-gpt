import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value:"en"
}

const configSlice = createSlice({
    name:'language',
    initialState,
    reducers:{
        changeLanguage:(state,action)=>{
            state.value = action.payload;
        }
    }
})

export const {changeLanguage} = configSlice.actions;
export default configSlice.reducer;