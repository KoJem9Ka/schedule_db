import { useAppDispatch, useAppSelector } from '../store'
import { thunkLoadLessonsTable, thunkLoadLessonsTableArgs } from './thunks'
import { api } from '../../API/api'
import { actionClearLessonsChecked, actionSetLessonChecked } from './slice'
import { toast } from 'react-toastify'

export const useLessons = () => {
  const state1 = useAppSelector( state => state.lessons )
  const dispatch = useAppDispatch()

  //api:
  const loadLessons = async (page: thunkLoadLessonsTableArgs['page'] = 1, limit: thunkLoadLessonsTableArgs['limit'] = 10) => toast.promise( dispatch( thunkLoadLessonsTable( { page, limit } ) ), {
    pending: 'Загрузка занятий...',
    success: 'Занятия загружены 👌',
    error  : 'Ошибка загрузки занятий 🤯',
  } )
  const removeLessons = async () => {
    const alrt = toast.loading( 'Удаление...' )
    return api.lessons.removeSome( state1.checkedLessons )
        .then( ({ data }) => {
          if (!data.error) {
            dispatch( actionClearLessonsChecked( (data.deletedIds)! ) )
            loadLessons( state1.page, state1.limit )
            toast.update( alrt, { render: `Удалены записи: ${(data.deletedIds)!.join( ', ' )}`, type: 'success', isLoading: false, autoClose: 5000 } )
          }
          else {
            toast.update( alrt, { render: `Ошибка удаления, причина: ${data.error}`, type: 'error', isLoading: false, autoClose: 5000 } )
          }
        } )
        .catch( e => toast.update( alrt, { render: `Ошибка удаления, причина: ${e.message}`, type: 'error', isLoading: false, autoClose: 5000 } ) )
  }
  //locals:
  const setLessonChecked = (id: number, checked: boolean) => dispatch( actionSetLessonChecked( { id, checked: checked } ) )
  const clearLessonsChecked = () => dispatch( actionClearLessonsChecked( state1.checkedLessons ) )

  return {
    ...state1,

    loadLessons,
    removeLessons,

    setLessonChecked,
    clearLessonsChecked,
  }
}
