import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../store/slices/heroesSlice";
import HeroGrid from "../components/HeroGrid";

const HeroesPage = () => {
  const dispatch = useDispatch();
  const { heroes, loading } = useSelector((state) => state.heroes);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  // Calculate real stats
  const heroesCount = heroes.length;
  const totalThanks = heroes.reduce((sum, hero) => sum + (hero.thanks_count || 0), 0);

  return (
    <>
      <section className="bg-white py-12 text-center px-4">
        <p className="text-sm text-orange-500 font-medium uppercase tracking-wide mb-2">
          🎉 Celebrating Community Impact
        </p>
        <h1 className="text-4xl font-extrabold text-gray-900">
          Meet Your Local <span className="text-orange-500">Heroes</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover and celebrate the extraordinary people making a positive
          difference in communities around the world. Every hero has a story
          worth sharing.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <p className="text-blue-600 text-3xl font-bold">
              {loading ? "..." : heroesCount}
            </p>
            <p className="text-gray-500 text-sm">Heroes Celebrated</p>
          </div>
          <div className="text-center">
            <p className="text-pink-500 text-3xl font-bold">
              {loading ? "..." : totalThanks}
            </p>
            <p className="text-gray-500 text-sm">Thanks Given</p>
          </div>
        </div>
      </section>
      <HeroGrid />
    </>
  );
};

export default HeroesPage;
