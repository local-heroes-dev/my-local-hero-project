import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import { storeUserInfo } from "./heroesSlice";

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue("No token found");
      }
      
      const response = await fetch(`${BASE_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          return rejectWithValue("Authentication expired");
        }
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Auth check error:', err);
      console.error('Error message:', err.message);
      
      if (err.message.includes('Failed to fetch')) {
        return rejectWithValue("Network error. Please check your internet connection.");
      }
      
      return rejectWithValue(err.message || "Authentication check failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Attempting login...');
      
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Login failed:', response.status);
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Login successful');
      return data;
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error message:', err.message);
      
      if (err.message.includes('Failed to fetch')) {
        return rejectWithValue("Network error. Please check your internet connection.");
      }
      if (err.message.includes('HTTP 500')) {
        return rejectWithValue("Server error. Please try again later.");
      }
      if (err.message.includes('HTTP 401')) {
        return rejectWithValue("Invalid email or password. Please try again.");
      }
      
      return rejectWithValue(err.message || "Login failed. Please check your credentials.");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting registration...');
      
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Registration failed:', response.status);
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Registration successful');
      return data;
    } catch (err) {
      console.error('Register error:', err);
      console.error('Error message:', err.message);
      
      if (err.message.includes('Failed to fetch')) {
        return rejectWithValue("Network error. Please check your internet connection.");
      }
      if (err.message.includes('HTTP 500')) {
        return rejectWithValue("Server error. Please try again later.");
      }
      if (err.message.includes('HTTP 409')) {
        return rejectWithValue("User already exists with this email.");
      }
      if (err.message.includes('HTTP 401')) {
        return rejectWithValue("Invalid credentials. Please try again.");
      }
      
      return rejectWithValue(err.message || "Registration failed. Please try again.");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
    } catch (err) {
      console.error('Logout error:', err);
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Check if there's a token on app startup
const token = localStorage.getItem('token');
if (token) {
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  initialState,
  name: "auth",
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // Store the token in localStorage or handle it as needed
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // Store the token in localStorage or handle it as needed
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // Clear the token from localStorage
        localStorage.removeItem('token');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
