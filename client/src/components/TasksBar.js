import { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { FaSortAmountUpAlt } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { BsCalendar, BsAlarm } from 'react-icons/bs';

const SortButtons = (props) => {
  const [sortDateToggle, setSortDateToggle] = useState(true)
  const [sortRemindToggle, setSortRemindToggle] = useState(true)

  return (
    <div >
      <Button variant="info" style={{ marginRight: 5 }} onClick={() => {
        sortDateToggle ? props.setSortBy('sortBy=createdAt:asc') : props.setSortBy('sortBy=createdAt:desc')
        setSortDateToggle(!sortDateToggle)
      }}>
        <BsCalendar style={{ marginRight: 5 }}></BsCalendar>
        Date</Button>
      <Button variant="info" onClick={() => {
        sortRemindToggle ? props.setSortBy('remindDate=true') : props.setSortBy('remindDate=false')
        setSortRemindToggle(!sortRemindToggle)
      }}>
        <BsAlarm style={{ marginRight: 5 }} ></BsAlarm>
        Reminder
      </Button>
    </div>
  )
}

export default function TasksBar(props) {
  const [sortToggle, setSortToggle] = useState(true)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='d-flex justify-content-between m-1'>
      {sortToggle ?
        <Button variant="info" onClick={() => props.addNote()}>
          <HiOutlineDocumentAdd style={{ marginRight: 5 }}></HiOutlineDocumentAdd>Add task</Button> : <SortButtons setSortBy={props.setSortBy}></SortButtons>}

      <Button variant="info" onClick={() => setSortToggle(!sortToggle)}>
        <FaSortAmountUpAlt style={{ marginRight: 5 }}></FaSortAmountUpAlt>
      </Button>

    </Navbar>
  )
}