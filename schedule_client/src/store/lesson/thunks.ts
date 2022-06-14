import { createAsyncThunk } from '@reduxjs/toolkit'
import { TAppAsyncThinkConfig } from '../store'
import { TAPI_RESPONSE_LoadAll } from '../../API/api'

export type thunkLoadLessonsTableArgs = { page: number, limit: number }
export type thunkLoadLessonsTableReturn = {
  response: TAPI_RESPONSE_LoadAll
  args: thunkLoadLessonsTableArgs
}

export const thunkLoadLessonsTable = createAsyncThunk<thunkLoadLessonsTableReturn, thunkLoadLessonsTableArgs, TAppAsyncThinkConfig>( 'lessons/load',
  async (args, { extra: api }) => ({
    response: ( await api.lessons.loadAll( args.page, args.limit ) ).data,
    args,
  })
)

