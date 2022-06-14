import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import LayoutMain from './layouts/LayoutMain'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import 'react-toastify/dist/ReactToastify.css'
import LessonEditPage from './pages/LessonPages/LessonEditPage'
import LessonNewPage from './pages/LessonPages/LessonNewPage'
import PointsPage from './pages/PointsPage/PointsPage'

const App: React.FC = () => (
  <>
    <Routes>
      <Route element={<Navigate to='/schedule'/>} path='/'/>
      <Route element={<LayoutMain/>} path='/'>

        <Route element={<SchedulePage/>} path='schedule'/>
        <Route element={<LessonNewPage/>} path='lesson/new'/>
        <Route element={<LessonEditPage/>} path='lesson/:id'/>

        <Route element={<PointsPage/>} path='points'/>
      </Route>
      <Route element={<Navigate to='/schedule'/>} path='*'/>
    </Routes>
  </>
)

export default App
