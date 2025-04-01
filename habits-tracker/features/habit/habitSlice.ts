import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchHabits, fetchAddHabit } from "./habitApi";

type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
}

type HabitState = {
    habits: Habit[];
    status: Record<string, "idle" | "loading" | "success" | "failed">;
    error: Record<string, string | null>;
}
type markAsDoneThunkParmas = {
    habitId: string, 
    token: string
}
type addHabitThunkParmas = {
    token: string, 
    title: string,
    description: string
}
const initialState: HabitState = {
    habits: [],
    status: {},
    error: {},
}
export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async (token: string, { rejectWithValue } ) => {
    const response = await fetchHabits(token);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to fetch habits");
    }
    console.log(responseJson);
    return responseJson;
});
export const markAsDoneThunk = createAsyncThunk("habit/markAsDone", async ({habitId, token}:markAsDoneThunkParmas, { rejectWithValue }) => {
    
    const response = await fetch(`http://localhost:3000/habits/markasdone/${habitId}`, {
        method: "PATCH",
        headers: {Authorization: 'Bearer '+token}
    });
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to mark habit as done");
    }else if(responseJson.message.toString() === "Habit restarted"){
        return rejectWithValue(responseJson.message);
    }else{
        return responseJson.message;
    }
    
});
export const fetchAddHabitThunk = createAsyncThunk("user/fetchAddHabit", async ({token, title, description}: addHabitThunkParmas,  {rejectWithValue}) => {
    const response = await fetchAddHabit(token, title, description);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to add Habit");
    }else if(responseJson.message.toString() === "Error creating habit"  ){
        return rejectWithValue(responseJson.message);
    }else{
        return responseJson.token;
        
    }
});
const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;
        },
        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },
        removeHabit: (state, action) => {
            state.habits = state.habits.filter(habit => habit._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        }).addCase(markAsDoneThunk.fulfilled, (state, action) => {
            state.status[action.meta.arg.habitId] = "success";
            state.error[action.meta.arg.habitId] = null;
        }).addCase(markAsDoneThunk.rejected, (state, action) => {  
            state.status[action.meta.arg.habitId] = "failed";
            state.error[action.meta.arg.habitId] = action.payload as string;
        }).addCase(fetchAddHabitThunk.fulfilled, (state, action) => {  
            state.habits.push(action.payload);
        });;
    }
});

export const { addHabits, addHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;