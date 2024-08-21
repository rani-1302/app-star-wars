import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import CharacterDetail from '../pages/CharacterDetail';
import { useGetFilmQuery, useGetStarshipQuery } from '../redux/characterSlice';
import '@testing-library/jest-dom';

jest.mock('../redux/characterSlice', () => ({
  useGetFilmQuery: jest.fn(),
  useGetStarshipQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const mockStore = configureStore([]);

describe('CharacterDetail Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      favourites: {
        characters: [],
      },
    });

    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useLocation as jest.Mock).mockReturnValue({
      state: {
        name: 'Luke Skywalker',
        gender: 'male',
        homePlanet: 'Tatooine',
        films: ['filmUrl1', 'filmUrl2'],
        starships: ['starshipUrl1'],
        height: '172',
        hairColor: 'blond',
        eyeColor: 'blue',
      },
    });

    (useGetFilmQuery as jest.Mock).mockImplementation((url: string) => ({
      data: `Film for ${url}`,
      isLoading: false,
      error: null,
    }));

    (useGetStarshipQuery as jest.Mock).mockImplementation((url: string) => ({
      data: `Starship for ${url}`,
      isLoading: false,
      error: null,
    }));
  });

  it('renders character details correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <CharacterDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
    expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Home Planet: Tatooine')).toBeInTheDocument();
    expect(
      screen.getByText('Film for filmUrl1, Film for filmUrl2')
    ).toBeInTheDocument();
    expect(screen.getByText('Starship for starshipUrl1')).toBeInTheDocument();
  });

  it('handles add to favourites and remove from favourites', () => {
    render(
      <Provider store={store}>
        <Router>
          <CharacterDetail />
        </Router>
      </Provider>
    );

    const addButton = screen.getByText('Add to Favourites');
    fireEvent.click(addButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'favourites/addFavourite',
      payload: {
        id: '1',
        name: 'Luke Skywalker',
        height: '172',
        gender: 'male',
        homePlanet: 'Tatooine',
      },
    });

    store = mockStore({
      favourites: {
        characters: [
          {
            id: '1',
            name: 'Luke Skywalker',
            height: '172',
            gender: 'male',
            homePlanet: 'Tatooine',
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <CharacterDetail />
        </Router>
      </Provider>
    );

    const removeButton = screen.getByText('Remove from Favourites');
    fireEvent.click(removeButton);

    const newActions = store.getActions();
    expect(newActions[0]).toEqual({
      type: 'favourites/removeFavourite',
      payload: '1',
    });
  });

  it('handles API errors gracefully', () => {
    (useGetFilmQuery as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch'),
    }));

    render(
      <Provider store={store}>
        <Router>
          <CharacterDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Error fetching films')).toBeInTheDocument();
  });
});
