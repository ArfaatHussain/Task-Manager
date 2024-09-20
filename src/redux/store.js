import { configureStore } from "@reduxjs/toolkit";

import {Tasks_reducer} from './reducer';

const store = configureStore({
    reducer:{
        tasks : Tasks_reducer
    }
})

export default store;