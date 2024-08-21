import { configureStore } from '@reduxjs/toolkit';
import searchReducer, {
  setCurrentPage,
  setSearchTerm,
} from '../redux/searchSlice';

/**
 * Test suite for the search slice.
 */
describe('searchSlice', () => {
  // Create a store with the search reducer
  const store = configureStore({
    reducer: {
      search: searchReducer,
    },
  });

  // Access the initial state
  const initialState = {
    currentPage: 1,
    searchTerm: '',
  };

  it('should return the initial state', () => {
    // Get the current state from the store
    const state = store.getState().search;
    expect(state).toEqual(initialState);
  });

  it('should handle setCurrentPage action', () => {
    // Dispatch the setCurrentPage action
    store.dispatch(setCurrentPage(2));

    // Get the updated state from the store
    const state = store.getState().search;
    expect(state.currentPage).toBe(2);
  });

  it('should handle setSearchTerm action', () => {
    // Dispatch the setSearchTerm action
    store.dispatch(setSearchTerm('Star Wars'));

    // Get the updated state from the store
    const state = store.getState().search;
    expect(state.searchTerm).toBe('Star Wars');
  });

  it('should handle multiple actions correctly', () => {
    // Dispatch multiple actions
    store.dispatch(setCurrentPage(3));
    store.dispatch(setSearchTerm('Galactic Empire'));

    // Get the updated state from the store
    const state = store.getState().search;
    expect(state.currentPage).toBe(3);
    expect(state.searchTerm).toBe('Galactic Empire');
  });
});
