import React,{useContext,useState,useEffect} from 'react'
import { TimePicker } from 'antd'
import dayjs from 'dayjs';
import { UserContext } from '../Context/Main';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
 function Input({type,placeholder,value,name,disabled,label,onHandler}) {
  return (
    <div className="form-group  text-capitalize">
    <label className='m-2'>{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onHandler} disabled={disabled} name={name} className='bg-light w-100 form-control form-control-lg round round-2 border border-primary'/>
  </div>
  )
}
export default function InputCom()
{
    const { data,setdata,eventsData,EditIndex,setEditIndex } = useContext(UserContext);
    useEffect(()=>{
          return()=>{
            setdata({
              selectedDate:'',
              eventName:'',
              description:'',
              endTime:'',
              startTime:'',
            })
            setEditIndex(-1)
            
          }
          },[])
    const [timeRange, setTimeRange] = useState([
      data.startTime ? dayjs(data.startTime, 'HH:mm') : "",
      data.endTime ? dayjs(data.endTime, 'HH:mm') : "",
    ]);
        const onHandler = (event) => {
        setdata({...data, [event.target.name]: event.target.value });
    };
    const onChange = (time, timeString) => {
      setdata({...data, startTime:timeString[0],endTime:timeString[1] });

        setTimeRange(time);
      };
      
    
    return (
<React.Fragment>
<Input type="text" label='Selected Date' placeholder="Enter Event name" value={data.selectedDate.slice(0,15)} name="selectedDate" disabled={true} onHandler={onHandler}/>
<Input type="text" label='Event name' placeholder="Enter Event name" value={data.eventName} name="eventName" disabled={false} onHandler={onHandler}/>
 <div >
 <label className='m-2'>Select Time</label>
 <TimePicker.RangePicker
 onChange={onChange}
 value={timeRange} 
 className='w-100 p-2 time border border-primary '
 format="HH:mm"
 getPopupContainer={(trigger) => trigger.parentNode} 
 /></div>
<Input type="text" label='Description' placeholder="Enter Description" value={data.description} name="description" disabled={false} onHandler={onHandler}/>
</React.Fragment>
    )
}
