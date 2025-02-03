import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async()=>{
        const responce= await axios.get('https://jsonplaceholder.typicode.com/posts');
                    return responce.data;
        });
    

const initialState={
    posts:[],
    loading:false,
    error:''
}
const postSlice =createSlice({
    name:"posts",
    initialState,
    reducers: {
         
        addpost: (state, action) => {
          state.posts.push(action.payload);
        },
        deletepost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
    },
    extraReducers: builder=>{
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
          })
        .addCase( fetchPosts.fulfilled,(state,action)=>{
            state.posts.push(...action.payload)
            state.loading=false
            
           
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload.message
        })
        .addDefaultCase((state,action)=>{})
        
    }
})
export const { setTodos, addpost, deletepost } = postSlice.actions;
export default postSlice.reducer;