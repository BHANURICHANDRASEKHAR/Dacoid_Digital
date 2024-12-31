import React,{ useContext } from 'react'
import { UserContext } from '../Context/Main'
import Nodata from '../../assets/noData.gif'
export default function Main() {
    const {eventsData,setEventsData,modal,setmodal,EditIndex,data,setdata,setEditIndex}=useContext(UserContext);

    function SetEditFunction(idx)
    {
      setEditIndex(idx);
      setdata(eventsData[idx]);
      setmodal(true);
    }
    function deleteFunction(idx)
    {
      eventsData.splice(idx, 1);
      setEventsData([...eventsData]);
      localStorage.setItem('events', JSON.stringify(eventsData));
    }
  return (
    <div>
    <h3 className='text-muted mb-2'>Event List</h3>
    <table className="table table-striped text-center table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Event Name</th>
      <th scope="col">Date</th>
      <th scope="col">Start Time</th>
      <th scope="col">End Time</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    {
       eventsData.length>0 ?eventsData.map((event,index)=>(
          <tr key={index} className='text-center p-2'>
            <th scope="row">{index+1}</th>
            <td>{event.eventName}</td>
            <td style={{minWidth:"120px"}}>{event.selectedDate}</td>
            <td>{event.startTime}</td>
            <td>{event.endTime}</td>
            <td>{event.description!=undefined ? event.description : "NA" }</td>
            <td>
            <button onClick={()=>SetEditFunction(index)} className='btn btn-primary m-1'>Edit</button>
              <button onClick={()=>deleteFunction(index)} className='btn btn-danger '>Del</button>
            </td>
          </tr>
        )):<tr aria-rowspan={6}>
        <td colSpan={7} style={{ textAlign: "center" }}>
          <img src={Nodata} alt="No Data" />
        </td>
      </tr>
    }
  </thead>
  </table>
    </div>
  )
}
