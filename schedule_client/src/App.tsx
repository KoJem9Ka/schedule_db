import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import LayoutMain from './layouts/LayoutMain'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import StudentsPage from './pages/dev/StudentsPage/StudentsPage'
import EducatorsPage from './pages/dev/EducatorsPage/EducatorsPage'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LessonEditPage from './pages/LessonPages/LessonEditPage'
import LessonNewPage from './pages/LessonPages/LessonNewPage'

const App: React.FC = () => (
  <>
    <ToastContainer position='bottom-right' theme='dark' transition={Flip}/>
    <Routes>
      <Route element={<Navigate to='/schedule'/>} path='/'/>

      <Route element={<LayoutMain/>} path='/'>
        <Route element={<SchedulePage/>} path='schedule'/>
        <Route element={<EducatorsPage/>} path='educators'/>
        <Route element={<StudentsPage/>} path='students'/>
        <Route element={<LessonNewPage/>} path='lesson/new'/>
        <Route element={<LessonEditPage/>} path='lesson/:id'/>
      </Route>
      <Route element={<Navigate to='/schedule'/>} path='*'/>
    </Routes>
  </>
)

export default App
