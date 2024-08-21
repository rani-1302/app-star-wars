import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Empty } from 'antd';
import CharacterCard from '../components/CharacterCard';
import { RootState } from '../redux/store';
import { removeFavourite } from '../redux/favouritesSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Component to list all favourite characters.
 * @returns {JSX.Element} The favourite characters list.
 */
const FavouritesList: React.FC = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.characters
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    dispatch(removeFavourite(id));
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="favourites-list-container" aria-label="Favourites list">
      {favourites.length > 0 ? (
        <Row gutter={[16, 16]} justify="center">
          {favourites.map((character) => (
            <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
              <CharacterCard
                id={character.id}
                name={character.name}
                gender={character.gender}
                homePlanet={character.homePlanet}
                height={character.height}
                onRemove={() => handleRemove(character.id)}
                viewDetails={true}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No favourite characters"
          aria-label="No favourite characters"
        />
      )}
      <div className="back-button">
        <Button
          type="primary"
          onClick={handleBack}
          aria-label="Back to Character List"
        >
          Back to Character List
        </Button>
      </div>
    </div>
  );
};

export default FavouritesList;
