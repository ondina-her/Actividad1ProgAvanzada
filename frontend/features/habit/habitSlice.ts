import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHabits } from "./habitApi";

type Habit ={
    _id : string;
    title : string;
    description: string;
}

type HabitState={
    habits: Habit[];
}

const initialState : HabitState={
    habits:[]
}

export const fetchHabitsThunk = createAsyncThunk('habits/fetchHabits', async()=>{
    const response = await fetchHabits();
    const responseJson = await response.json();
    return responseJson;

})


const habitSlice= createSlice({
    name: 'habits',
    initialState,
    reducers:{
        addHabits: (state, action)=>{
            state.habits= action.payload;
        }
    },
    extraReducers: builder =>{
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action)=>{
            state.habits = action.payload;
        })
    }
})

export const {addHabits} = habitSlice.actions;
export default habitSlice.reducer;

