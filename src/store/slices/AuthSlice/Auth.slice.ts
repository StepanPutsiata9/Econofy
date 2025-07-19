import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTokens, clearTokens, storeTokens, storeAvatar, getAvatar } from './AuthStorage';
import { jwtDecode } from 'jwt-decode';
import { Tokens } from './AuthStorage';
// import { ImageSourcePropType } from 'react-native';
interface JwtPayload {
  exp?: number; 
  iat?: number; 
  [key: string]: any; 
}

const isTokenValid = (decoded: unknown): boolean => {
  if (typeof decoded !== 'object' || decoded === null) {
    return false;
  }
  const payload = decoded as JwtPayload;
  if (payload.exp === undefined) {
    return true;
  }
  if (typeof payload.exp !== 'number') {
    return false;
  }
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  return expirationTime > currentTime;
};
const checkTokenExpiration = (token: string) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token) as JwtPayload;
    return isTokenValid(decoded);
  } catch (error) {
    console.error('Token decode error:', error);
    return false;
  }
};
interface AuthState {
  user: JwtPayload | null;
  isLoadinng: boolean;
  // ava:ImageSourcePropType | null;
  ava:string | null;

}

const initialState: AuthState = {
  user: null,
  isLoadinng: false,
  ava:null,
};

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await getTokens();
      if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
        const avatarkaString=await getAvatar();
        const avatarka=avatarkaString==="empty"?null:avatarkaString
        const decoded = jwtDecode(tokens.accessToken);
        return {decoded,avatarka};
      } else {
        const decoded = null;
        const avatarka=null;
        return {decoded,avatarka};
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ accessToken, refreshToken }: Tokens, { rejectWithValue }) => {
    try {
      if (!accessToken || !refreshToken) {
        throw new Error('Access token and refresh token are required');
      }
      try {
        await storeTokens({ accessToken, refreshToken });
      } catch (storageError) {
        console.error('Failed to store tokens:', storageError);
        throw new Error('Failed to save authentication data');
      }
      try {
        const tokens = await getTokens();
        if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
          const decoded = jwtDecode(tokens.accessToken);
          return decoded;
        } else {
          const decoded = null;
          return decoded;
        }
      } catch (error) {
        console.error('Login error:', error);
        const decoded = null;
        return decoded;
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await clearTokens();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);


export const setAva = createAsyncThunk(
  'auth/setavatar',
  async (avatar:string|null, { rejectWithValue }) => {
      try {
        console.log("tyr to set ava", avatar);
        await storeAvatar(avatar||"empty");
        const userAva = await getAvatar();
        return userAva;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state,action){
      state.isLoadinng=action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.isLoadinng = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.decoded;
        state.ava=action.payload.avatarka;
        state.isLoadinng = false;
      })
      .addCase(loadUser.rejected, state => {
        state.user = null;
        state.isLoadinng = false;
      })


      .addCase(login.pending, state => {
        state.isLoadinng = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoadinng = false;
      })
      .addCase(login.rejected, state => {
        state.user = null;
        state.isLoadinng = false;
      })


      .addCase(logout.pending, state => {
        state.isLoadinng = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.ava=null;
        state.isLoadinng = false;
      })

      .addCase(setAva.fulfilled,(state,action)=>{
        state.ava=action.payload;
      })
  },
});


export const { setLoading } = authSlice.actions
export default authSlice.reducer;
