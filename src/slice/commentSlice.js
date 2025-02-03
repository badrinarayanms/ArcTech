import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async(postid)=>{
        const responce= await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`);
                     
                    return responce.data;
        });

const initialState={
    comments:[],
    loading:false,
    error:''
}
const commentSlice=createSlice({
    name:'comments',
    initialState,
    reducers:{
        addcomment:(state,action)=>{

        }

    },
    extraReducers: builder=>{
            builder.addCase(fetchComments.pending, (state,action) => {
                state.loading = true;
              })
            .addCase( fetchComments.fulfilled,(state,action)=>{
                state.comments = action.payload;
                
                 
                state.loading=false
                 
                
               
            })
            .addCase(fetchComments.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload.message
            })
            .addDefaultCase((state,action)=>{})
            
        }
});

export const {addcomment } = commentSlice.actions;
export default commentSlice.reducer;