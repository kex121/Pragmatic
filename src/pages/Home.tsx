import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useListGamesQuery } from '../api/gamesApi';
import Header from '../components/Header/Header';
import GameList from '../components/GameList/GameList';
import logoIcon from '../assets/icons/logo.svg';
import './home.scss';

const Home: React.FC = () => {
  const { data, isLoading } = useListGamesQuery();
  const games = data?.data || [];
  const error = data?.error;
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<string>('');

  const filtered = useMemo(() => {
    return games.filter((g) => {
      if (filter !== 'all' && g.gameTypeID !== filter) return false;
      if (
        activeSearch &&
        !g.gameName.toLowerCase().includes(activeSearch.toLowerCase())
      )
        return false;
      return true;
    });
  }, [games, filter, activeSearch]);

  return (
    <div className='page'>
      <Header
        filter={filter}
        onFilter={setFilter}
        search={search}
        onSearch={setSearch}
        onSearchSubmit={() => {
          setActiveSearch(search);
          setSearch('');
        }}
      />

      <main className='content'>
        <div className='logo'>
          <img src={logoIcon} alt='logo' height={30} width={30} />
          <h1 className='title'>pragmatic play</h1>
        </div>
        <GameList
          games={filtered}
          isLoading={isLoading}
          error={error}
          onReset={() => {
            setFilter('all');
            setSearch('');
            setActiveSearch('');
          }}
        />
      </main>
    </div>
  );
};

export default Home;
