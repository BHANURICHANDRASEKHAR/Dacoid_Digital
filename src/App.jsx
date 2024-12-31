import React from 'react'
import CalenderMainView from './Components/Calendar_View/Main.jsx';
import Modal_Component from './Components/Event_Management/Main.jsx'
import {Toaster} from 'react-hot-toast'
export default function App() {
  return (
    <React.Fragment>
    <Modal_Component/>
    <CalenderMainView/>
    <Toaster position="top-center"/> 
    </React.Fragment>
  )
}
