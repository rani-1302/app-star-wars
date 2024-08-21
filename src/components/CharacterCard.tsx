import React from 'react';
import { Card, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useGetHomeworldQuery } from '../redux/characterSlice';

export interface CharacterCardProps {
  id: string;
  name: string;
  gender: string;
  homeworld?: string;
  homePlanet?: string;
  hairColor?: string;
  eyeColor?: string;
  films?: Array<string>;
  starships?: Array<string>;
  height?: string;
  onRemove?: () => void;
  viewDetails?: boolean;
}

/**
 * Renders a character card with details and actions.
 * @param {CharacterCardProps} props - The props for the component.
 * @returns {JSX.Element} The character card component.
 */
const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  gender,
  homeworld,
  films,
  starships,
  height,
  onRemove,
  viewDetails,
  hairColor,
  eyeColor,
  homePlanet,
}) => {
  const { data: homeworldData, isLoading } = useGetHomeworldQuery(homeworld);

  const actions = [
    onRemove && (
      <Button
        key="remove"
        type="default"
        danger
        size="middle"
        onClick={onRemove}
        aria-label={`Remove ${name} from favourites`}
        className="card-action-button"
      >
        Remove
      </Button>
    ),
    viewDetails && (
      <Link
        to={`/character/${id}`}
        state={{
          name,
          gender,
          homePlanet: homeworldData?.name,
          films,
          starships,
          height,
          hairColor,
          eyeColor,
        }}
        aria-label={`View details of ${name}`}
        className="card-action-link"
      >
        View Details
      </Link>
    ),
  ].filter(Boolean);

  return (
    <Card
      title={name}
      className="character-card"
      aria-labelledby={`character-card-title-${id}`}
    >
      <div className="card-content">
        <p id={`character-gender-${id}`}>Gender: {gender}</p>
        {height && <p id={`character-height-${id}`}>Height: {height}cm</p>}
        <p>
          Home Planet:
          {isLoading ? (
            <div className="loading-spinner" aria-live="polite">
              <Spin size="large" />
            </div>
          ) : (
            homeworldData?.name || homePlanet
          )}
        </p>
      </div>
      <div className="actions-container">
        <div
          className={`card-actions ${actions.length === 1 ? 'center' : ''}`}
          role="group"
          aria-labelledby={`character-card-actions-${id}`}
        >
          {actions.map((action, index) => (
            <div key={index} className="card-action-item">
              {action}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CharacterCard;
