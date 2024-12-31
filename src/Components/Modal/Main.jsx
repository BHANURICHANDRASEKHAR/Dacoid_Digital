import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../Context/Main.jsx';
import { useContext, useEffect } from 'react';
import InputCom from './Input.jsx';
import filter from '../Helpers/Toast_functions.js';
function StaticExample() {
   
    const { modal, setmodal,data,setdata,EditIndex,setEditIndex,eventsData,setEventsData } = useContext(UserContext);
     
    const handleClose = () => setmodal(false); 
    const success = async() =>{
        const flag=await filter(data,eventsData,setEventsData,EditIndex,setEditIndex)
        if(flag)
        {
            setmodal(false);

        }        
    }
    return (
        <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
        <h3 className='text-muted mb-2 text-center'>Event Management</h3>

        </Modal.Header>
        <Modal.Body><InputCom/></Modal.Body>
        <Modal.Footer>
          <Button variant="success" className='w-100 m-2' onClick={success}>
           Save
          </Button>
        
        </Modal.Footer>
      </Modal>
    );
}

export default StaticExample;
