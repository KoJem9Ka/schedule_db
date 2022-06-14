import { ToastPromiseParams } from 'react-toastify'

export const ToastAvailabilities: ToastPromiseParams = {
  pending: 'Подгрузка доступных для предмета групп и преподавателей...',
  success: 'Успешная подгрузка доступных для предмета групп и преподавателей',
  error  : 'Ошибка подгрузки доступных для предмета групп и преподавателей',
}

export const ToastRequirements: ToastPromiseParams = {
  pending: 'Подгрузка списков предметов и кабинетов...',
  success: 'Успешная подгрузка списков предметов и кабинетов',
  error  : 'Ошибка подгрузки списков предметов и преподавателей',
}

export const ToastAvRq: ToastPromiseParams = {
  pending: 'Подгрузка списков из бд...',
  success: 'Успешная подгрузка списков из бд',
  error  : 'Ошибка подгрузки списков из бд',
}

export const ToastLoadLesson: ToastPromiseParams = {
  pending: 'Загрузка занятия...',
  success: 'Занятие загружено',
  error  : 'Ошибка загрузки занятия',
}

export const ToastAddLesson: ToastPromiseParams = {
  pending: 'Добавление занятия...',
  success: 'Занятие добавлено!',
  error  : 'Ошибка добавления занятия',
}

export const ToastUpdateLesson: ToastPromiseParams = {
  pending: 'Обновление занятия в бд...',
  success: 'Успешное обновление занятия!',
  error  : 'Ошибка обновления занятия',
}

export const ToastRemoveOneLesson: ToastPromiseParams = {
  pending: 'Удаление занятия из бд...',
  success: 'Занятие удалено!',
  error  : 'Ошибка удаления занятия',
}

