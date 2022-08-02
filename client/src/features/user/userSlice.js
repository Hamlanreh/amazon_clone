import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: true,
};

export const getMe = createAsyncThunk('user/getMe', async () => {
  try {
    const { data } = await axios.get('/users/me');
    return data.data;
  } catch (error) {
    return error;
  }
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
      const { data } = await axios.post('/users/login', { email, password });
      return data.user;
    } catch (error) {
      return error;
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const { data } = await axios.post('/users/signup', {
        name,
        email,
        password,
        passwordConfirm,
      });
      return data.user;
    } catch (error) {
      return error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async email => {
    try {
      await axios.post('/users/forgotpassword', { email });
    } catch (error) {
      return error;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, name, email, photo }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photo);

      const { data } = await axios.patch(`/users/${id}`, formData);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updateUser',
  async ({ password, passwordConfirm }) => {
    try {
      const { data } = await axios.patch(`/users/updatepassword`, {
        password,
        passwordConfirm,
      });
      return data.user;
    } catch (error) {
      return error;
    }
  }
);

export const deactivateAccount = createAsyncThunk(
  'user/deactivateAccount',
  async () => {
    try {
      await axios.delete('users/deactivate');
    } catch (error) {
      return error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [getMe.pending]: state => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [getMe.fulfilled]: (state, action) => {
      const user = action.payload;
      if (!user?._id) return;

      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [getMe.rejected]: state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    [login.pending]: state => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [login.rejected]: state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    [signup.pending]: state => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    [signup.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [signup.rejected]: state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    [forgotPassword.pending]: state => {
      state.isLoading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [forgotPassword.rejected]: state => {
      state.isLoading = false;
    },

    [updateUser.pending]: state => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [updateUser.rejected]: state => {
      state.isLoading = false;
      state.user = {};
    },

    [updatePassword.pending]: state => {
      state.isLoading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [updatePassword.rejected]: state => {
      state.isLoading = false;
      state.user = {};
    },

    [deactivateAccount.pending]: state => {
      state.isLoading = true;
    },
    [deactivateAccount.fulfilled]: state => {
      state.user = {};
      state.isLoading = false;
    },
    [deactivateAccount.rejected]: state => {
      state.isLoading = false;
      state.user = {};
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
