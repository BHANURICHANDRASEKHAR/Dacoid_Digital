import React,{ useContext,useEffect, useState } from 'react'
import { UserContext } from '../Context/Main'
import Nodata from '../../assets/noData.gif'
import * as XLSX from 'xlsx'; 
export default function Main() {
    const {eventsData,SetSeletedDate,SelectedDate,setEventsData,modal,setmodal,EditIndex,data,setdata,setEditIndex}=useContext(UserContext);

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
    const [Value,SetValue]=useState('')
    const [FilteredEvents,setFilteredEvents]=useState(eventsData)
    const downloadExcel = () => {
      const exportData = FilteredEvents.map((item, index) => ({
        "S.no": index + 1,
        "Event Name": item.eventName,
        "Date": item.selectedDate,
        "Start Time": item.startTime,
        "End Time": item.endTime,
        "Description": item.description,
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
    
      XLSX.writeFile(workbook, "events_data.xlsx"); 
    };
    useEffect(() => {
      if (Value === '' || Value === 'All') {
          setFilteredEvents(eventsData);
      } else {
          setFilteredEvents(eventsData.filter(event => event.selectedDate === Value));
      }
  }, [Value, eventsData]);
  return (
    <div>
    <div className="d-flex">
    <h3 className='text-muted mb-2'>Event List</h3>
    <div>
    <select onChange={(e)=>SetValue(e.target.value)} value={Value} className="form-select ms-3">
      <option value="">All events</option>
      <option value={SelectedDate}>Events On {SelectedDate}</option>
    </select>
  </div>
    <button onClick={downloadExcel} className="btn btn-primary ms-auto mb-2">
      Download Excel
    </button>
  </div>
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
      FilteredEvents.length>0 ? FilteredEvents.map((event, index) => {
        event.id=index;
        
        return (
          <tr key={index} className='text-center p-2'>
            <th scope="row">{index + 1}</th>
            <td>{event.eventName}</td>
            <td style={{ minWidth: "120px" }}>{event.selectedDate}</td>
            <td>{event.startTime}</td>
            <td>{event.endTime}</td>
            <td>{event.description !== undefined ? event.description : "NA"}</td>
            <td>
              <button onClick={() => SetEditFunction(index)} className='btn btn-primary m-1'>Edit</button>
              <button onClick={() => deleteFunction(index)} className='btn btn-danger'>Del</button>
            </td>
          </tr>
        );
      }):<tr aria-rowspan={6}>
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
