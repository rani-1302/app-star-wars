import { characterSlice } from '../redux/characterSlice';
import store, { RootState, AppDispatch } from '../redux/store';

// Mock data and actions
const mockCharacter = {
  id: '1',
  name: 'Luke Skywalker',
};

const mockAddFavourite = {
  type: 'favourites/addFavourite',
  payload: mockCharacter,
};

describe('Redux Store Configuration', () => {
  it('should be configured with the correct reducers and middleware', () => {
    const state: RootState = store.getState();
    expect(state).toHaveProperty(characterSlice.reducerPath);
    expect(state).toHaveProperty('favourites');
    expect(state).toHaveProperty('search');
  });

  it('should have the correct initial state for each slice', () => {
    const state: RootState = store.getState();

    // Checking initial state for character slice
    expect(state[characterSlice.reducerPath]).toBeDefined();

    // Checking initial state for favourites slice
    expect(state.favourites).toEqual({ characters: [] });

    // Checking initial state for search slice
    expect(state.search).toEqual({ currentPage: 1, searchTerm: '' });
  });

  it('should correctly dispatch actions and update state', () => {
    const dispatch: AppDispatch = store.dispatch;

    // Dispatching an action to add a favourite character
    dispatch(mockAddFavourite);

    // Checking updated state
    const state: RootState = store.getState();
    expect(state.favourites.characters).toContain(mockCharacter);
  });

  it('should have the correct types for RootState and AppDispatch', () => {
    // Ensure types are correct
    const state: RootState = store.getState();
    const dispatch: AppDispatch = store.dispatch;

    expect(typeof state).toBe('object');
    expect(typeof dispatch).toBe('function');
  });
});
