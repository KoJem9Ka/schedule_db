import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TError, TLesson, TStatus } from '../types'
import { thunkLoadLessonsTable } from './thunks'

const initialState = {
  list            : [] as TLesson[],
  page            : 1,
  limit           : 10,
  checkedLessons  : [] as number[],
  serverItemsCount: 0,
  status          : 'idle' as TStatus,
  error           : null as TError,
}

export const lessonSlice = createSlice( {
  name         : 'lesson',
  initialState,
  reducers     : {
    actionSetLessonChecked   : (state, action: PayloadAction<{ id: number, checked: boolean }>) => {
      action.payload.checked
        ? state.checkedLessons.push( action.payload.id )
        : state.checkedLessons = state.checkedLessons.filter( id => id !== action.payload.id )
    },
    actionClearLessonsChecked: (state, action: PayloadAction<number[]>) => {
      const delIds = action.payload
      state.checkedLessons = state.checkedLessons.filter( id => !delIds.includes( id ) )
    },
  },
  extraReducers: builder => builder
      .addCase( thunkLoadLessonsTable.fulfilled, (state, action) => {
        state.list = action.payload.response.lessons
        state.serverItemsCount = action.payload.response.count
        state.page = action.payload.args.page
        state.limit = action.payload.args.limit
      } )

      .addMatcher( action => /lessons\/.*?\/pending/.test( action.type ), (state, action) => {
        state.status = 'pending'
        state.error = null
      } )
      .addMatcher( action => /lessons\/.*?\/fulfilled/.test( action.type ), (state, action) => {
        state.status = 'fulfilled'
      } )
      .addMatcher( action => /lessons\/.*?\/rejected/.test( action.type ), (state, action) => {
        state.status = 'rejected'
        // if (action.error.message !== 'Aborted')
        state.error = action.payload || action.error.message
      } ),
} )

export const { actionSetLessonChecked, actionClearLessonsChecked } = lessonSlice.actions
