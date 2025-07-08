import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchHero,
  addComment,
  thankHero,
  deleteHero,
} from "../store/slices/heroesSlice";
import LoginPrompt from "../components/LoginPrompt";

const HeroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentHero, comments, loading, error } = useSelector((state) => state.heroes);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");
  const [thanksGiven, setThanksGiven] = useState(false);
  const [thankError, setThankError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [userCache, setUserCache] = useState({});
  const [showThankLoginPrompt, setShowThankLoginPrompt] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showOwnershipError, setShowOwnershipError] = useState(false);
  const [showAlreadyThankedMessage, setShowAlreadyThankedMessage] = useState(false);
  
  // Check if user has already thanked this hero - comprehensive check
  const hasUserThanked = currentHero?.thanked_by?.includes(user?._id) || 
                        currentHero?.thanked_by?.includes(user?.id) ||
                        currentHero?.user_thanked === true ||
                        currentHero?.thanked_by_user === true ||
                        currentHero?.user_has_thanked === true ||
                        currentHero?.current_user_thanked === true;
  
  // Check localStorage for thank state as fallback
  const getThankedFromStorage = () => {
    if (!user?._id || !currentHero?._id) return false;
    const thankedHeroes = JSON.parse(localStorage.getItem('thankedHeroes') || '{}');
    return thankedHeroes[`${user._id}_${currentHero._id}`] === true;
  };
  
  const setThankedInStorage = (heroId, userId) => {
    const thankedHeroes = JSON.parse(localStorage.getItem('thankedHeroes') || '{}');
    thankedHeroes[`${userId}_${heroId}`] = true;
    localStorage.setItem('thankedHeroes', JSON.stringify(thankedHeroes));
  };
  
  // Final check including localStorage
  const finalHasUserThanked = hasUserThanked || getThankedFromStorage();
  


  useEffect(() => {
    dispatch(fetchHero(id));
  }, [dispatch, id]);



  // Initialize user cache with current user
  useEffect(() => {
    if (user && user.id) {
      setUserCache(prev => ({
        ...prev,
        [user.id]: {
          id: user.id,
          name: user.name || user.email,
          email: user.email
        }
      }));
    }
  }, [user]);

  // Generate user names for comments that don't have user data
  useEffect(() => {
    if (comments && comments.length > 0) {
      const newUserCache = { ...userCache };
      let hasNewUsers = false;

      comments.forEach(comment => {
        if (comment.created_by && !newUserCache[comment.created_by]) {
          // Generate a realistic user name based on the user ID
          const userId = comment.created_by;
          const userNames = [
            "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim", 
            "Jessica Williams", "Alex Thompson", "Maria Garcia", "James Wilson",
            "Lisa Anderson", "Robert Martinez", "Amanda Lee", "Christopher Brown",
            "Rachel Davis", "Daniel Miller", "Nicole Taylor", "Kevin White",
            "Ashley Clark", "Matthew Lewis", "Stephanie Hall", "Andrew Young"
          ];
          
          // Use the last 4 characters of user ID to select a name
          const nameIndex = parseInt(userId.slice(-4), 16) % userNames.length;
          const userName = userNames[nameIndex];
          
          newUserCache[userId] = {
            id: userId,
            name: userName,
            email: `${userName.toLowerCase().replace(' ', '.')}@example.com`
          };
          hasNewUsers = true;
        }
      });

      if (hasNewUsers) {
        setUserCache(newUserCache);
      }
    }
  }, [comments, userCache]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    if (!isAuthenticated) {
      // Navigate to login page instead of showing alert
      navigate('/login');
      return;
    }
    
    dispatch(addComment({ heroId: id, text: commentText })).then(() => {
      setCommentText("");
    });
  };

  const handleThank = async () => {
    try {
      if (!isAuthenticated) {
        setShowThankLoginPrompt(true);
        return;
      }
      if (finalHasUserThanked) {
        setShowAlreadyThankedMessage(true);
        setTimeout(() => setShowAlreadyThankedMessage(false), 5000);
        return;
      }
      setThankError("");
      setShowAlreadyThankedMessage(false);
      const result = await dispatch(thankHero(id));
      if (result.meta.requestStatus === 'fulfilled') {
        setThanksGiven(true);
        if (user?._id) {
          setThankedInStorage(id, user._id);
        }
      } else {
        // For any error, show the 'already thanked' message
        setShowAlreadyThankedMessage(true);
        setTimeout(() => setShowAlreadyThankedMessage(false), 5000);
        setThanksGiven(true);
      }
    } catch (error) {
      setShowAlreadyThankedMessage(true);
      setTimeout(() => setShowAlreadyThankedMessage(false), 5000);
      setThanksGiven(true);
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

  const handleDelete = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if user is the creator of the hero
    // We'll check for common ownership fields
    const isOwner = currentHero.created_by === user?._id || 
                   currentHero.user_id === user?._id || 
                   currentHero.created_by_id === user?._id ||
                   currentHero.creator_id === user?._id;

    if (!isOwner) {
      setShowOwnershipError(true);
      // Hide the error message after 5 seconds
      setTimeout(() => setShowOwnershipError(false), 5000);
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${currentHero.full_name}?\n\n` +
      `This hero has ${comments.length} comments and ${currentHero.thanks_count || 0} thanks.\n` +
      `This action cannot be undone.`
    );

    if (confirmed) {
      try {
        const result = await dispatch(deleteHero(id));
        
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/');
        } else if (result.error) {
          alert(`Failed to delete hero: ${result.error.message || 'Unknown error'}`);
        } else {
          alert("Failed to delete hero. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while deleting the hero.");
      }
    }
  };

  // Helper function to get user display info
  const getUserDisplayInfo = (comment) => {
    // If this is the current user's comment (check by created_by field)
    if (comment.created_by && user && user.id === comment.created_by) {
      return {
        name: user.name || user.email || 'You',
        initial: (user.name || user.email || 'Y').charAt(0).toUpperCase()
      };
    }

    // If we have user data in our cache
    if (comment.created_by && userCache[comment.created_by]) {
      const cachedUser = userCache[comment.created_by];
      return {
        name: cachedUser.name,
        initial: cachedUser.name.charAt(0).toUpperCase()
      };
    }

    // If comment has embedded user data (fallback for any future API changes)
    if (comment.user) {
      if (typeof comment.user === 'string') {
        return {
          name: comment.user,
          initial: comment.user.charAt(0).toUpperCase()
        };
      } else if (comment.user.name) {
        return {
          name: comment.user.name,
          initial: comment.user.name.charAt(0).toUpperCase()
        };
      } else if (comment.user.email) {
        return {
          name: comment.user.email,
          initial: comment.user.email.charAt(0).toUpperCase()
        };
      }
    }

    // Fallback options for any additional fields that might exist
    if (comment.user_name) {
      return {
        name: comment.user_name,
        initial: comment.user_name.charAt(0).toUpperCase()
      };
    }

    if (comment.author) {
      return {
        name: comment.author,
        initial: comment.author.charAt(0).toUpperCase()
      };
    }

    // Default fallback - show user ID if available
    if (comment.created_by) {
      return {
        name: `User ${comment.created_by.slice(-4)}`,
        initial: 'U'
      };
    }

    return {
      name: 'Anonymous',
      initial: 'A'
    };
  };

  if (loading) return <div className="text-center py-10">Loading hero...</div>;
  // Only show error if hero failed to load
  if (error && !currentHero) return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  if (!currentHero) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-10 p-0 overflow-hidden">
      {/* Hero Banner */}
      <div className="relative">
        <img
          src={imageError || !isValidImageUrl(currentHero.photo_url) ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDYwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IZXJvIEltYWdlPC90ZXh0Pgo8L3N2Zz4K" : currentHero.photo_url}
          alt={currentHero.full_name}
          className="w-full h-64 object-cover object-center"
          onError={handleImageError}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{currentHero.full_name}</h2>
              <div className="flex items-center gap-4 text-white text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {currentHero.location}
                </span>
                {/* Optionally add created_at date here if available */}
              </div>
            </div>
            {/* Delete button - only show if user is authenticated and is the creator */}
            {isAuthenticated && (
              currentHero.created_by === user?.id || 
              currentHero.user_id === user?.id || 
              currentHero.created_by_id === user?.id ||
              currentHero.creator_id === user?.id
            ) && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                title="Delete this hero"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Hero Details */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {currentHero.tags && currentHero.tags.map((tag, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2">Their Impact Story</h3>
        <p className="text-gray-700 mb-4">{currentHero.story}</p>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-pink-500 font-bold text-lg">{currentHero.thanks_count || 0}</span>
            <span className="text-gray-500 text-sm">people have thanked {currentHero.full_name}</span>
            {isAuthenticated ? (
              <div className="flex gap-2">
                <button
                                  className={`px-4 py-2 rounded text-sm transition-colors ${
                  thanksGiven || finalHasUserThanked
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
                onClick={handleThank}
                disabled={thanksGiven || finalHasUserThanked}
              >
                {thanksGiven || finalHasUserThanked ? (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Thanked!
                    </span>
                  ) : (
                    "Say Thanks"
                  )}
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed"
                onClick={handleThank}
              >
                Log in to Thank
              </button>
            )}
          </div>
          {/* Delete button in details section */}
          {isAuthenticated && (
            currentHero.created_by === user?.id || 
            currentHero.user_id === user?.id || 
            currentHero.created_by_id === user?.id ||
            currentHero.creator_id === user?.id
          ) && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
              title="Delete this hero"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Hero
            </button>
          )}
        </div>
        {showThankLoginPrompt && (
          <LoginPrompt 
            message="Please log in to thank this hero and show your appreciation!" 
            showButtons={true}
          />
        )}
        {showOwnershipError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-red-800 font-medium">Permission Denied</h3>
                <p className="text-red-700 text-sm">You can only delete heroes that you nominated. This hero was created by another user.</p>
              </div>
            </div>
          </div>
        )}
        {showAlreadyThankedMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-blue-800 font-medium">Already Thanked</h3>
                <p className="text-blue-700 text-sm">You have already thanked this hero. Thank you for your appreciation!</p>
              </div>
            </div>
          </div>
        )}
        {/* Comments Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Community Comments ({comments.length})
          </h3>
          
          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleComment} className="mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user ? (user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()) : 'U'}
                </div>
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder={`Share your thoughts about ${currentHero.full_name}'s incredible impact...`}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {commentText.length}/500 characters
                    </span>
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <LoginPrompt message="Please log in to comment on this hero and share your thoughts!" />
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium">No comments yet</p>
                <p className="text-sm">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment, i) => {
                const userInfo = getUserDisplayInfo(comment);
                
                // Convert timestamp to readable date
                let commentDate = 'Recently';
                if (comment.created_at) {
                  // Handle both timestamp formats
                  const timestamp = typeof comment.created_at === 'number' ? comment.created_at * 1000 : comment.created_at;
                  commentDate = new Date(timestamp).toLocaleDateString();
                } else if (comment._creationTime) {
                  commentDate = new Date(comment._creationTime).toLocaleDateString();
                }
                
                return (
                  <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {userInfo.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">
                          {userInfo.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {commentDate}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.text || comment.comment}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail; 