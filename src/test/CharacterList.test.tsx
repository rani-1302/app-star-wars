import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CharacterList from '../pages/CharacterList';
import { useGetCharactersQuery } from '../redux/characterSlice';
import searchReducer from '../redux/searchSlice';
import '@testing-library/jest-dom';
import { RootState } from '../redux/store';

jest.mock('../components/CharacterCard', () => () => <div>CharacterCard</div>);
jest.mock(
  '../components/SearchBar',
  () =>
    ({
      searchInput,
      setSearchInput,
      handleSearch,
    }: {
      searchInput: string;
      setSearchInput: (value: string) => void;
      handleSearch: () => void;
    }) => (
      <div>
        <input
          placeholder="Search characters"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    )
);
jest.mock('../redux/characterSlice', () => ({
  useGetCharactersQuery: jest.fn(),
}));

window.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
const mockStore = configureStore({
  reducer: {
    search: searchReducer,
  },
});

describe('CharacterList Component', () => {
  beforeEach(() => {
    // Set default behavior of the useGetCharactersQuery mock
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            url: 'http://swapi.dev/api/people/1/',
            name: 'Luke Skywalker',
            gender: 'male',
            homeworld: 'http://swapi.dev/api/planets/1/',
            films: ['http://swapi.dev/api/films/1/'],
            hair_color: 'blond',
            eye_color: 'blue',
            starships: ['http://swapi.dev/api/starships/12/'],
            height: '172',
          },
        ],
        count: 1,
      },
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText(/Search characters/i)
    ).toBeInTheDocument();
  });

  it('should handle search input and perform search', () => {
    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search characters/i), {
      target: { value: 'Luke' },
    });
    fireEvent.click(screen.getByText(/Search/i));

    expect((mockStore.getState() as RootState).search.searchTerm).toBe('Luke');
  });

  it('should display loading spinner when data is being fetched', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: jest.fn(),
    });

    const { container } = render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('should display characters when data is available', async () => {
    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    expect(await screen.findByText('CharacterCard')).toBeInTheDocument();
  });

  it('should handle pagination and page change', () => {
    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    fireEvent.click(screen.getByText('1'));
    expect((mockStore.getState() as RootState).search.currentPage).toBe(1);
  });

  it('should display no results message when no characters are found', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    expect(
      screen.getByText(
        /Oops! It seems there is no character with this search. Try again!/i
      )
    ).toBeInTheDocument();
  });

  it('should handle back button click', () => {
    render(
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Back to Character List/i));

    expect((mockStore.getState() as RootState).search.searchTerm).toBe('');
    expect((mockStore.getState() as RootState).search.currentPage).toBe(1);
  });
});
