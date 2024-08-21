import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents a favourite character's details.
 *
 * @interface FavouriteCharacter
 * @property {string} id - The unique identifier of the character.
 * @property {string} name - The name of the character.
 * @property {string} gender - The gender of the character.
 * @property {string} height - The height of the character.
 * @property {string} homeworld - The homeworld of the character.
 */
interface FavouriteCharacter {
  id: string;
  name: string;
  gender: string;
  height: string;
  homePlanet: string;
}

/**
 * The state structure for storing favourite characters.
 *
 * @interface FavouritesState
 * @property {FavouriteCharacter[]} characters - An array of favourite characters.
 */
interface FavouritesState {
  characters: FavouriteCharacter[];
}

/**
 * The initial state for the favourites slice.
 *
 * @type {FavouritesState}
 */
const initialState: FavouritesState = {
  characters: [],
};

/**
 * A slice for managing favourite characters, including actions to add and remove characters from the favourites list.
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    /**
     * Adds a character to the list of favourite characters.
     *
     * @param {FavouritesState} state - The current state of favourites.
     * @param {PayloadAction<FavouriteCharacter>} action - The action payload containing the favourite character to add.
     */
    addFavourite(state, action: PayloadAction<FavouriteCharacter>) {
      state.characters.push(action.payload);
    },

    /**
     * Removes a character from the list of favourite characters by ID.
     *
     * @param {FavouritesState} state - The current state of favourites.
     * @param {PayloadAction<string>} action - The action payload containing the ID of the character to remove.
     */
    removeFavourite(state, action: PayloadAction<string>) {
      state.characters = state.characters.filter(
        (character) => character.id !== action.payload
      );
    },
  },
});

// Export actions for use in components
export const { addFavourite, removeFavourite } = favouritesSlice.actions;

// Export the reducer to be included in the store
export default favouritesSlice.reducer;
