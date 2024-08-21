import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, {
  addFavourite,
  removeFavourite,
} from '../redux/favouritesSlice';

// Create a test store with the favourites reducer
const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

// Define some test characters
const testCharacter1 = {
  id: '1',
  name: 'Luke Skywalker',
  gender: 'male',
  height: '1.72m',
  homePlanet: 'Tatooine',
};

const testCharacter2 = {
  id: '2',
  name: 'Leia Organa',
  gender: 'female',
  height: '1.50m',
  homePlanet: 'Alderaan',
};

describe('favouritesSlice', () => {
  it('should return the initial state', () => {
    // Get the state from the store
    const state = store.getState().favourites;
    expect(state.characters).toEqual([]);
  });

  it('should handle addFavourite action', () => {
    // Dispatch the addFavourite action
    store.dispatch(addFavourite(testCharacter1));

    // Get the updated state from the store
    const state = store.getState().favourites;
    expect(state.characters).toContainEqual(testCharacter1);
  });

  it('should handle removeFavourite action', () => {
    // Add a character first
    store.dispatch(addFavourite(testCharacter1));

    // Remove the character
    store.dispatch(removeFavourite(testCharacter1.id));

    // Get the updated state from the store
    const state = store.getState().favourites;
    expect(state.characters).not.toContainEqual(testCharacter1);
  });

  it('should handle adding and removing multiple favourites', () => {
    // Add multiple characters
    store.dispatch(addFavourite(testCharacter1));
    store.dispatch(addFavourite(testCharacter2));

    // Get the updated state from the store
    let state = store.getState().favourites;
    expect(state.characters).toContainEqual(testCharacter1);
    expect(state.characters).toContainEqual(testCharacter2);

    // Remove one character
    store.dispatch(removeFavourite(testCharacter1.id));

    // Get the updated state from the store
    state = store.getState().favourites;
    expect(state.characters).not.toContainEqual(testCharacter1);
    expect(state.characters).toContainEqual(testCharacter2);
  });
});
