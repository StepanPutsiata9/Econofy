import { configureStore } from '@reduxjs/toolkit'
import currencySlice from './slices/Currency.slice'
import authSlice from "./slices/AuthSlice/Auth.slice"
import homeSlice from "./slices/Home.slice"
import budgetsSlice from "./slices/Budget.slice.ts"
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    currency:currencySlice,
    auth:authSlice,
    home:homeSlice,
    budgets:budgetsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch