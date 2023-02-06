import { configureStore } from '@reduxjs/toolkit'
import keranjangReducer from './keranjangSlice'

const store = configureStore({
    reducer: {
        keranjang: keranjangReducer
    }
})

export default store