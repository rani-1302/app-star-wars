import React, { useEffect, useState } from 'react';
import { Pagination, Button, Col, Row, Spin, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCurrentPage, setSearchTerm } from '../redux/searchSlice';
import { useGetCharactersQuery } from '../redux/characterSlice';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import { FetchedData } from '../types';

const { Title } = Typography;

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.search.currentPage
  );
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [searchInput, setSearchInput] = useState('');

  const {
    data: fetchedData,
    refetch,
    isLoading,
  } = useGetCharactersQuery<{ data: FetchedData; isLoading: boolean }>({
    page: currentPage,
    search: searchTerm,
  });

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleBack = () => {
    dispatch(setSearchTerm('')); // Clear search term
    dispatch(setCurrentPage(1)); // Reset to first page
    setSearchInput('');
  };

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      message.warning('Please enter a valid search term');
      return;
    }
    dispatch(setSearchTerm(searchInput));
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      refetch();
    }
  }, [currentPage, searchTerm, refetch]);

  return (
    <div className="character-list-container" aria-label="Character list">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <div className="loading-spinner" aria-live="polite">
          <Spin size="large" />
        </div>
      ) : fetchedData && fetchedData.results.length > 0 ? (
        <>
          <Row gutter={16}>
            {fetchedData.results.map((character) => (
              <Col
                key={character.url}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="character-card-col"
                aria-label={`Character card for ${character.name}`}
              >
                <CharacterCard
                  id={character.url.split('/').slice(-2, -1)[0]}
                  name={character.name}
                  gender={character.gender}
                  homeworld={character.homeworld}
                  films={character.films}
                  hairColor={character.hair_color}
                  eyeColor={character.eye_color}
                  starships={character.starships}
                  height={character.height}
                  viewDetails={true}
                />
              </Col>
            ))}
          </Row>
          <div className="pagination-container">
            <Pagination
              current={currentPage}
              total={fetchedData.count}
              pageSize={10}
              onChange={handlePageChange}
              showSizeChanger={false}
              aria-label="Pagination controls"
            />
          </div>
        </>
      ) : (
        <div className="no-results">
          <Title level={4} aria-live="assertive">
            Oops! It seems there is no character with this search. Try again!
          </Title>
        </div>
      )}

      {!isLoading && searchTerm && (
        <div className="back-button-container">
          <Button
            type="primary"
            onClick={handleBack}
            aria-label="Back to Character List"
          >
            Back to Character List
          </Button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
