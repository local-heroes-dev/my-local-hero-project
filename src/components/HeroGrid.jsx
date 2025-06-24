import React from 'react';
import HeroCard from './HeroCard';

const heroes = [
  {
    name: 'Jane Doe',
    location: 'Austin, TX',
    description: 'Organized weekly food drives for local shelters.',
    imageUrl: 'https://via.placeholder.com/300x200',
  },
  {
    name: 'John Smith',
    location: 'Denver, CO',
    description: 'Started a community garden to support local families.',
    imageUrl: 'https://via.placeholder.com/300x200',
  },
];

const HeroGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {heroes.map((hero, index) => (
        <HeroCard key={index} {...hero} />
      ))}
    </div>
  );
};

export default HeroGrid;
