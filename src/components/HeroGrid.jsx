import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../store/slices/heroesSlice';
import HeroCard from './HeroCard';

const HeroGrid = () => {
  const dispatch = useDispatch();
  const { heroes, loading, error } = useSelector((state) => state.heroes);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  // Filter heroes by name, story, or tags
  const filteredHeroes = heroes.filter(hero => {
    const q = search.toLowerCase();
    return (
      hero.full_name?.toLowerCase().includes(q) ||
      hero.story?.toLowerCase().includes(q) ||
      (Array.isArray(hero.tags) && hero.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="px-4 pb-12">
      {/* Search and Filters */}
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search heroes by name, story, or tag..."
          className="w-full border rounded-lg px-4 py-3 text-gray-700 shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Hero count */}
      <div className="max-w-3xl mx-auto mb-4 text-gray-500 text-sm">
        {filteredHeroes.length} heroes found
      </div>
      {/* Grid */}
      {loading ? (
        <div className="text-center py-10">Loading heroes...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredHeroes.map((hero) => (
            <HeroCard
              key={hero.id || hero._id}
              id={hero.id || hero._id}
              full_name={hero.full_name}
              location={hero.location}
              story={hero.story}
              tags={hero.tags}
              photo_url={hero.photo_url}
              thanks_count={hero.thanks_count}
              alreadyThanked={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroGrid;
