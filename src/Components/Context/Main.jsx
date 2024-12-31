import React,{createContext, useEffect, useState} from 'react'
export const  UserContext=createContext();
export default function Main({children}) {
    const [modal,setmodal]=useState(false);
    const [eventsData,setEventsData]=useState([]);
    useEffect(()=>{
        const loadEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEventsData(loadEvents)
    },[])
    const [data,setdata]=useState({
        selectedDate:'',
        eventName:'',
        description:'',
        endTime:'',
        startTime:'',
    });
   const [EditIndex,setEditIndex]=useState(-1);
  
  return (
    <UserContext.Provider value={{modal,setmodal,data,setdata,eventsData,setEventsData,EditIndex,setEditIndex}}>
      {children}
    </UserContext.Provider>
  )
}
