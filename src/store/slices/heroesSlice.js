import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";

// Get all heroes
export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/heroes`);
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch heroes");
    }
  }
);

// Get one hero
export const fetchHero = createAsyncThunk(
  "heroes/fetchHero",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/heroes/${id}`);
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch hero");
    }
  }
);

// Create hero
export const createHero = createAsyncThunk(
  "heroes/createHero",
  async (heroData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      let body, headers;
      if (heroData.photo && typeof heroData.photo !== 'string') {
        // Use FormData for file upload
        body = new FormData();
        body.append('full_name', heroData.full_name);
        body.append('location', heroData.location);
        body.append('story', heroData.story);
        body.append('description', heroData.description);
        body.append('impact_area', heroData.impact_area || '');
        if (heroData.tags && Array.isArray(heroData.tags)) {
          heroData.tags.forEach(tag => body.append('tags[]', tag));
        }
        body.append('photo', heroData.photo);
        headers = {
          'Authorization': `Bearer ${token}`,
        };
      } else {
        // No file, send JSON
        body = JSON.stringify({
          full_name: heroData.full_name,
          location: heroData.location,
          story: heroData.story,
          description: heroData.description,
          impact_area: heroData.impact_area,
          tags: heroData.tags,
          photo_url: heroData.photo_url || null,
        });
        headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
      }
      const res = await fetch(`${BASE_URL}/api/heroes`, {
        method: 'POST',
        headers,
        body,
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create hero");
    }
  }
);

// Delete hero
export const deleteHero = createAsyncThunk(
  "heroes/deleteHero",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to delete hero with ID:', id);
      console.log('Using token:', token ? 'Token exists' : 'No token');
      
      // Use proxy URL to avoid CORS issues in development
      const deleteUrl = `${BASE_URL}/api/heroes/${id}`;
      
      console.log('Full URL:', deleteUrl);
      
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      console.log('Delete response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Delete error response:', errorText);
        console.error('Response headers:', Object.fromEntries(res.headers.entries()));
        throw new Error(errorText);
      }
      
      console.log('Hero deleted successfully');
      return id;
    } catch (error) {
      console.error('Delete hero error:', error);
      return rejectWithValue(error.message || "Failed to delete hero");
    }
  }
);

// Add comment to hero
export const addComment = createAsyncThunk(
  "heroes/addComment",
  async ({ heroId, text }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/heroes/${heroId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add comment");
    }
  }
);

// Thank a hero
export const thankHero = createAsyncThunk(
  "heroes/thankHero",
  async (heroId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const url = `${BASE_URL}/api/heroes/${heroId}/thank`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const responseText = await res.text();
      
      if (!res.ok) {
        // Try to parse error response as JSON if possible
        let errorMessage = responseText;
        try {
          const errorJson = JSON.parse(responseText);
          errorMessage = errorJson.message || errorJson.error || responseText;
        } catch (e) {
          // If not JSON, use the text as is
          errorMessage = responseText;
        }
        
        throw new Error(`Server error (${res.status}): ${errorMessage}`);
      }
      
      // Try to parse successful response
      try {
        return JSON.parse(responseText);
      } catch (e) {
        // If response is not JSON, return a success object
        return { success: true, message: responseText };
      }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to thank hero");
    }
  }
);

// Get all heroes for a user
export const fetchUserHeroes = createAsyncThunk(
  "heroes/fetchUserHeroes",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/heroes`);
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user's heroes");
    }
  }
);

// Get user information by ID
export const fetchUserById = createAsyncThunk(
  "heroes/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

// Store user information in cache
export const storeUserInfo = createAsyncThunk(
  "heroes/storeUserInfo",
  async (userData, { rejectWithValue }) => {
    try {
      // This is a local operation to store user info in our cache
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to store user info");
    }
  }
);

const initialState = {
  heroes: [],
  loading: false,
  error: null,
  currentHero: null,
  userHeroes: [],
  comments: [],
  users: {}, // Store user information by ID
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setCurrentHero(state, action) {
      state.currentHero = action.payload;
    },
    clearCurrentHero(state) {
      state.currentHero = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all heroes
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one hero
      .addCase(fetchHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHero = action.payload;
        state.comments = action.payload.comments || [];
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create hero
      .addCase(createHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes.unshift(action.payload);
      })
      .addCase(createHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete hero
      .addCase(deleteHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = state.heroes.filter(h => h.id !== action.payload);
        state.userHeroes = state.userHeroes.filter(h => h.id !== action.payload);
        // Clear current hero if it was deleted
        if (state.currentHero && state.currentHero.id === action.payload) {
          state.currentHero = null;
        }
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thank hero
      .addCase(thankHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thankHero.fulfilled, (state, action) => {
        state.loading = false;
        // Update thanks count in currentHero if it exists
        if (state.currentHero && action.payload) {
          // Create a new object to avoid mutation
          state.currentHero = {
            ...state.currentHero,
            thanks_count: action.payload.total || (state.currentHero.thanks_count || 0) + 1,
            user_thanked: true
          };
        }
        // Also update in the heroes list if the hero exists there
        const heroIndex = state.heroes.findIndex(h => h._id === action.payload?.hero_id || h.id === action.payload?.hero_id);
        if (heroIndex !== -1 && action.payload) {
          state.heroes[heroIndex] = {
            ...state.heroes[heroIndex],
            thanks_count: action.payload.total || (state.heroes[heroIndex].thanks_count || 0) + 1
          };
        }
      })
      .addCase(thankHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user's heroes
      .addCase(fetchUserHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.userHeroes = action.payload;
      })
      .addCase(fetchUserHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        // Store user info by ID
        if (action.payload && action.payload.id) {
          state.users[action.payload.id] = action.payload;
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Store user info
      .addCase(storeUserInfo.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.users[action.payload.id] = action.payload;
        }
      });
  },
});

export const { clearError, setCurrentHero, clearCurrentHero } = heroesSlice.actions;
export default heroesSlice.reducer;
