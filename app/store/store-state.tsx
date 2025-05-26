import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './store-sample/store-sample-slice'
import rsvpMessageReducer from './store-rsvp/store-rsvp-slice'


export const store = configureStore({
    reducer: {
        counter: counterReducer, //  Sample State Management
        rsvpMessage: rsvpMessageReducer // RSVP store 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




