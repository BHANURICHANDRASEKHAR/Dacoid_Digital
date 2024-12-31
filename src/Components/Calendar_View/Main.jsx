import React from 'react'
import Event_List from '../Event_List/Main.jsx'
import Calendar from './Calendar'
export default function Main() {
  return (
    <div className='container-fluid  mt-3'>
    <div className='row'>
    <div className='col-md-6'><Calendar/></div>
    <div className='col-md-6'><Event_List/></div>
    </div>
    </div>
  )
}
