import { createSlice,createAsyncThunk, isPending, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const gettodo = createAsyncThunk(
    'gets/getTodo',
    async()=>{
        return axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
            return res.data
        })
    }
)
const initialState={
    todos:[],
    loading:false,
    error:''
}
const todoslice =createSlice({
    name:"todos",
    initialState,
    reducers: {
         
        addTodo: (state, action) => {
          state.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    },
    extraReducers: builder=>{
        builder.addCase(gettodo.pending, (state) => {
            state.loading = true;
          })
        .addCase( gettodo.fulfilled,(state,action)=>{
            state.todos.push(...action.payload)
            state.loading=false
        })
        .addCase(gettodo.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        })
        .addDefaultCase((state,action)=>{})
        
    }
})
export const { setTodos, addTodo, deleteTodo } = todoslice.actions;
export default todoslice.reducer;