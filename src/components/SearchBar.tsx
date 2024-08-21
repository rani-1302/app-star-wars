import React from 'react';
import { Input, Button } from 'antd';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
}) => {
  return (
    <div className="search-container" aria-label="Search for characters">
      <div className="search-bar">
        <Input
          placeholder="Please enter characters..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={handleSearch}
          aria-label="Search input"
        />
        <Button
          type="primary"
          onClick={handleSearch}
          aria-label="Search button"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
