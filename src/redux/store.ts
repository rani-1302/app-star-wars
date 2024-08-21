import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './characterSlice';
import favouritesReducer from './favouritesSlice';
import searchReducer from './searchSlice';

/**
 * Configures the Redux store with reducers and middleware.
 */
const store = configureStore({
  reducer: {
    // The reducer for the SWAPI API service.
    [characterSlice.reducerPath]: characterSlice.reducer,

    // The reducer for managing favourite characters.
    favourites: favouritesReducer,

    // The reducer for managing search-related state.
    search: searchReducer,
  },

  /**
   * Adds custom middleware to the store, including the middleware for the SWAPI API service.
   *
   * @param {Function} getDefaultMiddleware - Function to get the default middleware.
   * @returns {Array} The middleware chain with the SWAPI API middleware added.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterSlice.middleware),
});

/**
 * The root state type inferred from the store's state.
 *
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The dispatch type inferred from the store's dispatch function.
 *
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

export default store;
