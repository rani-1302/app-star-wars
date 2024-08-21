import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useGetHomeworldQuery } from '../redux/characterSlice';
import CharacterCard, { CharacterCardProps } from '../components/CharacterCard';

jest.mock('../redux/characterSlice', () => ({
  useGetHomeworldQuery: jest.fn(),
}));

const defaultProps: CharacterCardProps = {
  id: '1',
  name: 'Luke Skywalker',
  gender: 'Male',
  homeworld: 'Tatooine',
  homePlanet: 'Tatooine',
  height: '172',
  hairColor: 'Blond',
  eyeColor: 'Blue',
  films: ['Film1', 'Film2'],
  starships: ['Starship1'],
  onRemove: jest.fn(),
  viewDetails: true,
};

describe('CharacterCard', () => {
  it('renders the character card with provided props', () => {
    (useGetHomeworldQuery as jest.Mock).mockReturnValue({
      data: { name: 'Tatooine' },
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172cm/)).toBeInTheDocument();
    expect(screen.getByText(/Home Planet:Tatooine/)).toBeInTheDocument();
  });

  it('shows home planet from props if homeworld data is not available', () => {
    (useGetHomeworldQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home Planet:Tatooine/)).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', () => {
    (useGetHomeworldQuery as jest.Mock).mockReturnValue({
      data: { name: 'Tatooine' },
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...defaultProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Remove/));
    expect(defaultProps.onRemove).toHaveBeenCalled();
  });

  it('renders View Details link when viewDetails is true', () => {
    (useGetHomeworldQuery as jest.Mock).mockReturnValue({
      data: { name: 'Tatooine' },
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...defaultProps} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/View Details/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/character/1');
  });

  it('does not render View Details link when viewDetails is false', () => {
    const props = { ...defaultProps, viewDetails: false };

    (useGetHomeworldQuery as jest.Mock).mockReturnValue({
      data: { name: 'Tatooine' },
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...props} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/View Details/)).not.toBeInTheDocument();
  });
});
