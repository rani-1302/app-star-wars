import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const mockSetSearchInput = jest.fn();
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SearchBar component correctly', () => {
    render(
      <SearchBar
        searchInput=""
        setSearchInput={mockSetSearchInput}
        handleSearch={mockHandleSearch}
      />
    );

    expect(
      screen.getByPlaceholderText('Please enter characters...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('updates input value when typed in', () => {
    render(
      <SearchBar
        searchInput=""
        setSearchInput={mockSetSearchInput}
        handleSearch={mockHandleSearch}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Please enter characters...'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    expect(mockSetSearchInput).toHaveBeenCalledWith('test query');
  });

  it('calls handleSearch when Search button is clicked', () => {
    render(
      <SearchBar
        searchInput="test query"
        setSearchInput={mockSetSearchInput}
        handleSearch={mockHandleSearch}
      />
    );

    const buttonElement = screen.getByText('Search');
    fireEvent.click(buttonElement);

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('calls handleSearch when Enter key is pressed in input field', () => {
    render(
      <SearchBar
        searchInput="test query"
        setSearchInput={mockSetSearchInput}
        handleSearch={mockHandleSearch}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Please enter characters...'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // Assert that handleSearch is called
    expect(mockHandleSearch).toHaveBeenCalled();
  });
});
