import React from 'react'

import { Outlet } from 'react-router'
import Footer from '../Componentes/Footer'
import Navber from '../Componentes/Navber/Navber'

const Root = () => {
  return (
    <div>
      <Navber />
      <br /><br /><br /><br />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Root
