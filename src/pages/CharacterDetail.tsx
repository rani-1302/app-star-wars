import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Tag, Spin } from 'antd';
import { RootState } from '../redux/store';
import { addFavourite, removeFavourite } from '../redux/favouritesSlice';
import { useGetFilmQuery, useGetStarshipQuery } from '../redux/characterSlice';
import { Film, Starship } from '../types';

/**
 * Component to display the details of a specific Star Wars character.
 * @returns {JSX.Element} The rendered component.
 */
const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    name,
    gender,
    homePlanet,
    films = [],
    starships = [],
    height,
    hairColor,
    eyeColor,
  } = location.state || {}; // Handle case where state might be undefined
  const favourites = useSelector(
    (state: RootState) => state.favourites.characters
  );
  const isFavourite = favourites.some((char) => char.id === id);

  // Fetch films
  const filmResults = films.map((url: string) => useGetFilmQuery(url));
  const filmsLoading = filmResults.some(
    (result: { isLoading: boolean }) => result.isLoading
  );
  const filmsError = filmResults.find(
    (result: { error: Error }) => result.error
  )?.error;
  const filmsData = filmResults
    .map((result: { data: Array<Film> }) => result.data)
    .filter(Boolean);

  // Fetch starships
  const starshipResults = starships.map((url: string) =>
    useGetStarshipQuery(url)
  );
  const starshipsLoading = starshipResults.some(
    (result: { isLoading: boolean }) => result.isLoading
  );
  const starshipsError = starshipResults.find(
    (result: { error: Error }) => result.error
  )?.error;
  const starshipsData = starshipResults
    .map((result: { data: Array<Starship> }) => result.data)
    .filter(Boolean);

  /**
   * Handles adding or removing the character from the favourites list.
   */
  const handleFavourite = () => {
    const character = {
      id: id!,
      name: name,
      height: height,
      gender: gender,
      homePlanet,
    };
    if (isFavourite) {
      dispatch(removeFavourite(id!));
    } else {
      dispatch(addFavourite(character));
    }
  };

  /**
   * Navigates back to the previous page.
   */
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="character-detail-container" aria-label="Character details">
      <Card title={name}>
        <p>Hair Color: {hairColor}</p>
        <p>Eye Color: {eyeColor}</p>
        <p>Gender: {gender}</p>
        <p>Home Planet: {homePlanet}</p>

        <p>Films:</p>
        {filmsLoading && <Spin size="small" aria-live="polite" />}
        {filmsError && <Tag color="error">Error fetching films</Tag>}
        {filmsData.length > 0 && <p>{filmsData.join(', ')}</p>}

        <p>Starships:</p>
        {starshipsLoading && <Spin size="small" aria-live="polite" />}
        {starshipsError && <Tag color="error">Error fetching starships</Tag>}
        {starshipsData.length > 0 ? (
          <p>{starshipsData.join(', ')}</p>
        ) : (
          <p>n/a</p>
        )}

        <div className="button-group">
          <Button onClick={handleBack} aria-label="Go back">
            Back
          </Button>
          <Button
            type="primary"
            onClick={handleFavourite}
            aria-label={
              isFavourite ? 'Remove from Favourites' : 'Add to Favourites'
            }
          >
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CharacterDetail;
