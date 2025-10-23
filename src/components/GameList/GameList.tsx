import React, { useEffect, useRef, useState, useCallback } from 'react';
import GameCard from '../GameCard/GameCard';
import './gameList.scss';

interface Game {
  gameID: string;
  gameName: string;
  gameTypeID: string;
  technology: string;
  platform: string;
  firstSeenAt: string;
}

const BATCH = 24;

interface Props {
  games: Game[];
  isLoading?: boolean;
  error?: string;
  onReset?: () => void;
}

const GameList: React.FC<Props> = ({ games, isLoading, error, onReset }) => {
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(BATCH);
  }, [games]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && visibleCount < games.length) {
        setVisibleCount((prev) => Math.min(games.length, prev + BATCH));
      }
    },
    [games.length, visibleCount],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) {
    return (
        <div className="loading">Загрузка...</div>
    );
  }

  if (error) {
    return (
      <div className='no-games'>
        <h2>{error}</h2>
        <button className='reset-button' onClick={onReset}>
          Сбросить
        </button>
      </div>
    );
  }

  return (
    <div className='games-container'>
      <div className='games-grid'>
        {!!games.length ? (
          games
            .slice(0, visibleCount)
            .map((g) => (
              <GameCard key={g.gameID} gameID={g.gameID} name={g.gameName} />
            ))
        ) : (
          <div className='no-games'>
            <h2>По вашему запросу не найдено игр</h2>
            <button className='reset-button' onClick={onReset}>
              Сбросить
            </button>
          </div>
        )}
      </div>
      <div ref={observerTarget} style={{ height: '20px', margin: '20px 0' }} />
    </div>
  );
};

export default GameList;
