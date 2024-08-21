import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import FavouritesList from '../pages/FavouritesList';
import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, { removeFavourite } from '../redux/favouritesSlice';
import { characterSlice } from '../redux/characterSlice';
import '@testing-library/jest-dom';

export const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      favourites: favouritesReducer,
      [characterSlice.reducerPath]: characterSlice.reducer, // Ensure this matches the reducer name
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterSlice.middleware),
  });
};

window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('FavouritesList', () => {
  test('renders correctly with favourite characters', () => {
    const store = createMockStore({
      favourites: {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            homePlanet: 'Tatooine',
            height: '172',
          },
        ],
      },
      characterSlice: {
        queries: {},
        mutations: {},
        provided: '',
        subscriptions: {},
        config: '',
      },
      search: { currentPage: 1, searchTerm: '' },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouritesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryAllByText(/Luke Skywalker/i)).toBeTruthy();
  });

  test('shows empty message when there are no favourite characters', () => {
    const store = createMockStore({
      favourites: {
        characters: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouritesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No favourite characters/i)).toBeInTheDocument();
  });

  test('dispatches removeFavourite action on character card remove button click', () => {
    const store = createMockStore({
      favourites: {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            homePlanet: 'Tatooine',
            height: '172',
          },
        ],
      },
    });

    // Mock dispatch function
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouritesList />
        </MemoryRouter>
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeFavourite('1'));
  });

  test('back to character list should be present', async () => {
    const navigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));

    const store = createMockStore({
      favourites: {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            homePlanet: 'Tatooine',
            height: '172',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouritesList />
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByText(/Back to Character List/i);

    expect(backButton).toBeInTheDocument();
  });

  test('renders multiple favourite characters correctly', () => {
    const store = createMockStore({
      favourites: {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            homePlanet: 'Tatooine',
            height: '172',
          },
          {
            id: '2',
            name: 'Darth Vader',
            gender: 'male',
            homePlanet: 'Tatooine',
            height: '202',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavouritesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });
});
