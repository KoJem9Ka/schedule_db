import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { api, TApi } from '../API/api'
import { lessonSlice } from './lesson/slice'

export const store = configureStore( {
  reducer   : {
    lessons: lessonSlice.reducer,
  },
  devTools  : true,
  middleware: getDefaultMiddleware => getDefaultMiddleware( {
    thunk: { extraArgument: api },
  } ).concat( logger ),
} )

export type TAppState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()
export type TAppAsyncThinkConfig = {
  extra: TApi
}
