import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
    counter: number;
};

const initialState: CounterState = {
    counter: 0,
};
export const counterSlice = createSlice({
    name: "INITIAL_NAME",
    initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
    },
});
