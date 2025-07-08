import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thankHero } from '../store/slices/heroesSlice';

const HeroCard = ({ id, full_name, location, story, tags, photo_url, thanks_count, alreadyThanked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleThank = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Navigate to login page instead of showing alert
      navigate('/login');
      return;
    }
    
    if (!alreadyThanked) {
      dispatch(thankHero(id));
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Helper function to validate image URL
  const isValidImageUrl = (url) => {
    if (!url) return false;
    // Check if URL is valid and not a placeholder
    return url.startsWith('http') && 
           !url.includes('example.com') && 
           !url.includes('placeholder') &&
           url.length > 10;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/heroes/${id}`)}
    >
      <div className="relative">
        <img
          src={imageError || !isValidImageUrl(photo_url) ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IZXJvIEltYWdlPC90ZXh0Pgo8L3N2Zz4K' : photo_url}
          alt={full_name}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2 flex flex-col items-end">
          <span className="bg-white/90 text-pink-500 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {thanks_count || 0}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags && tags.map((tag, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{full_name}</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {location}
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{story}</p>
        <div className="flex items-center justify-between mt-auto">
          {isAuthenticated ? (
            <button
              className={`px-4 py-2 rounded text-sm font-medium flex items-center gap-1 ${alreadyThanked ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'}`}
              onClick={handleThank}
              disabled={alreadyThanked}
            >
              {alreadyThanked ? 'Thanked' : 'Thank'}
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded text-sm font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
              onClick={handleThank}
            >
              Log in to Thank
            </button>
          )}
          <button
            className="px-4 py-2 rounded text-sm font-medium bg-orange-50 text-orange-600 hover:bg-orange-100"
            onClick={e => { e.stopPropagation(); navigate(`/heroes/${id}`); }}
          >
            Read Story &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;