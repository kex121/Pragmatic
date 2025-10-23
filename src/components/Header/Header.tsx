import { FC } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import './header.scss';

interface Props {
  filter: string;
  onFilter: (value: string) => void;
  search: string;
  onSearch: (value: string) => void;
  onSearchSubmit: () => void;
}

const Header: FC<Props> = ({
  filter,
  onFilter,
  search,
  onSearch,
  onSearchSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className='app-header'>
      <div className='left-block'>
        <div className='filter-container'>
          <label className='label'>Game Type</label>
          <select
            className='game-type-filter'
            value={filter}
            onChange={(e) => onFilter(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='vs'>Slots</option>
            <option value='lg'>Live Games</option>
            <option value='cs'>Casino</option>
            <option value='bj'>Blackjack</option>
            <option value='bc'>Baccarat</option>
            <option value='rl'>Roulette</option>
          </select>
        </div>
      </div>
      <div className='right-block'>
        <label className='label'>Search</label>
        <div className='search-row'>
          <div className='input-with-icon'>
            <img src={searchIcon} alt="Search" className='search-icon' />
            <input
              placeholder='Search'
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className='search-input'
            />
          </div>
          <button className='search-btn' onClick={onSearchSubmit}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
