import React,{createContext, useEffect, useState} from 'react'
export const  UserContext=createContext();
import dayjs from 'dayjs';
export default function Main({children}) {
    const [modal,setmodal]=useState(false);
    const [eventsData,setEventsData]=useState([]);
    const [SelectedDate,SetSeletedDate]=useState()

    useEffect(()=>{
        const loadEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEventsData(loadEvents);
        const newValue=dayjs();
        SetSeletedDate(newValue?.format("YYYY-MM-DD"));
    },[])
    console.log(SelectedDate);
    const [data,setdata]=useState({
        selectedDate:'',
        eventName:'',
        description:'',
        endTime:'',
        startTime:'',
    });
   const [EditIndex,setEditIndex]=useState(-1);
  
  return (
    <UserContext.Provider value={{modal,setmodal,data,setdata,SelectedDate,SetSeletedDate,eventsData,setEventsData,EditIndex,setEditIndex}}>
      {children}
    </UserContext.Provider>
  )
}
