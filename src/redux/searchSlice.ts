import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the search state.
 *
 * @interface SearchState
 * @property {number} currentPage - The current page number.
 * @property {string} searchTerm - The search term used for filtering.
 */
interface SearchState {
  currentPage: number;
  searchTerm: string;
}

/**
 * The initial state for the search slice.
 *
 * @type {SearchState}
 */
const initialState: SearchState = {
  currentPage: 1,
  searchTerm: '',
};

/**
 * Redux slice for managing search-related state, including current page and search term.
 */
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    /**
     * Sets the current page in the search state.
     *
     * @param {SearchState} state - The current state of the search.
     * @param {PayloadAction<number>} action - The action payload containing the new page number.
     */
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    /**
     * Sets the search term in the search state.
     *
     * @param {SearchState} state - The current state of the search.
     * @param {PayloadAction<string>} action - The action payload containing the new search term.
     */
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

// Export actions for use in components
export const { setCurrentPage, setSearchTerm } = searchSlice.actions;

// Export the reducer to be included in the store
export default searchSlice.reducer;
