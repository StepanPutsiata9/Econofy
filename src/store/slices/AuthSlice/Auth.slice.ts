import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTokens, clearTokens, storeTokens } from './AuthStorage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Tokens } from './AuthStorage';
const isTokenValid = (decoded: unknown): boolean => {
  if (
    typeof decoded === 'object' &&
    decoded !== null &&
    'exp' in decoded &&
    (typeof (decoded as { exp: unknown }).exp === 'number' ||
      typeof (decoded as { exp: unknown }).exp === 'string')
  ) {
    const exp = (decoded as { exp: number | string }).exp;
    const expTime = typeof exp === 'string' ? parseInt(exp, 10) : exp;
    return expTime * 1000 > Date.now();
  }
  return false;
};
const checkTokenExpiration = (token: string) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token) as JwtPayload;
    isTokenValid(decoded);
  } catch (error) {
    console.error('Token decode error:', error);
    return false;
  }
};
interface AuthState {
  user: JwtPayload | null;
  isLoadinng: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoadinng: false,
};
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
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


const currencySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        state.isLoadinng = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoadinng = false;
      })
  },
});

export default currencySlice.reducer;

//   const login = async (accessToken, refreshToken) => {
//     try {
//       // 1. Валидация входных параметров
//       if (!accessToken || !refreshToken) {
//         throw new Error("Access token and refresh token are required");
//       }
//       try {
//         await storeTokens(accessToken, refreshToken);
//       } catch (storageError) {
//         console.error('Failed to store tokens:', storageError);
//         throw new Error("Failed to save authentication data");
//       }
//       try {
//         const tokens = await getTokens();
//         if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
//           const decoded = jwtDecode(tokens.accessToken);
//           setUser(decoded);
//           setToken(tokens.accessToken);
//         } else {
//           setUser(null);
//           setToken(null);
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         setUser(null);
//         setToken(null);
//       }
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       // Сбрасываем состояние при ошибке
//       setUser(null);
//       setToken(null);
//       throw error;
//     }
//   };
