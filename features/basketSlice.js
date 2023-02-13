import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: []
    },
    reducers: {
        addToBasket: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromBasket: (state, action) => {
            let items = [...state.items.filter(item => item.id === action.payload).slice(0, -1)];
            state.items = [...state.items.filter(item => item.id !== action.payload), ...items];
            // const index = state.items.findIndex(item => item.id === action.payload)

            // const newBasket = [...state.items];

            // if (index >= 0) {
            //     newBasket.splice(index, 1);
            // } else {
            //     console.log(`Cant remove product (id: ${action.payload}) as it is not in basket`);
            // }

            // state.items = newBasket;
        },
    }
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemWithId = (state, id) => state.basket.items.filter(item => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((prev, curr) => prev + parseInt(curr.price), 0);

export default basketSlice.reducer