import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slice/postSlice";
import commentsReducer from "./slice/commentSlice"

const store= configureStore({
    reducer:{
        posts:postReducer,
        comments:commentsReducer,
    },
});

export default store;