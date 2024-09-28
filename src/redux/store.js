import {configureStore} from '@reduxjs/toolkit'
import gmailReducer from './gmailSlice'

export const store = configureStore({
    reducer : {
        gmail : gmailReducer
    }
})