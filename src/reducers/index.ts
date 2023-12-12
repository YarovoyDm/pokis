import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from './PokemonsReducer';

const rootReducer = combineReducers({
    pokemons: pokemonsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;