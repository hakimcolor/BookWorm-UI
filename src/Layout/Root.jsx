import React from 'react'
import Navber from '../Componentes/Navber/Navber'
import { Outlet } from 'react-router'
import Footer from '../Componentes/Footer'

const Root = () => {
  return (
    <div>
      <Navber />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Root
