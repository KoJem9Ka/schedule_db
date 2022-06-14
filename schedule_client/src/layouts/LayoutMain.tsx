import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router'
import Container from '../HOC/Container'
import { Bounce, ToastContainer } from 'react-toastify'

//Bounce, Flip, Icons, Slide, ToastContainer, Zoom, collapseToast, cssTransition, toast, useToast, useToastContainer

const LayoutMain: React.FC = () => (
  <>
    <ToastContainer
      autoClose={3000}
      draggable={true}
      position='bottom-right'
      theme='dark'
      transition={Bounce}
    />
    <Header/>
    <Container>
      <Outlet/>
    </Container>
  </>
)

export default LayoutMain
