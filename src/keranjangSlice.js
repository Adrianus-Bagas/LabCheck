import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jumlah:0
}

export const keranjangSlice = createSlice({
    name: "keranjang",
    initialState,
    reducers: {
        hitungJumlah: (state, action) => {
            state.jumlah = action.payload
        }
    }
})

export const { hitungJumlah } = keranjangSlice.actions
export default keranjangSlice.reducer