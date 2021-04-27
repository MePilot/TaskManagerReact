import { useSpring, animated } from 'react-spring'
import { Container, Button, Image, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LinesEllipsis from 'react-lines-ellipsis'

export default function Task(props) {

  const [note, setNote] = useState(props.task);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [toggleOpened, setToggleOpened] = useState(false);
  const [styles, api] = useSpring(() => ({ height: 200, width: 300 }))

  useEffect(() => {
    setNote(props.task)

  }, [props.task]);

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const Calendar = (props) => {
    const [remDate, setRemDate] = useState(note.remindDate ? new Date(note.remindDate) : new Date());
    return (
      <Container fluid>
        <p style={{ marginBottom: 0 }}>Choose date</p>
        <Row className="align-items-center">
          <Col xs={7} onClick={(e) => e.stopPropagation()}>
            <DatePicker selected={remDate} onChange={date => {
              setRemDate(date)
              setNote({ ...note, remindDate: new Date(date) })
            }} />
          </Col>
          <Col>
          </Col>
          <Col >
            <Button style={{ margin: 5 }} onClick={() => {
              props.editNote(note)
            }}>Ok</Button>
          </Col>
        </Row>
      </Container>
    )
  }

  const TaskControls = () => {

    return (
      <Container className='d-flex justify-content-around align-items-center' style={{ height: 90 }}>
        <Row>
          <Button style={{ marginRight: 15 }} onClick={() => props.editNote(note)}>Save</Button>
          {note.remindDate ?
            <Button onClick={
              (e) => {
                setNote({ ...note, remindDate: null })
              }

            }>Remove reminder</Button> :
            <Button onClick={
              (e) => {
                e.stopPropagation()
                setToggleCalendar(!toggleCalendar)
              }

            }>Set reminder</Button>
          }
        </Row>

      </Container>
    )
  }

  return (

    <animated.div className='task m-3' style={styles} onClick={() => {

      setToggleOpen(!toggleOpen)
      setToggleCalendar(false)
      api.start({
        from: { height: 200, width: 300 },
        reverse: toggleOpen,
        onRest: () => setToggleOpened(!toggleOpened),
        to: { height: 400, width: 350 }
      })
    }}>

      <div className="d-flex justify-content-between m-2" onClick={(e) => e.stopPropagation()}>
        <div>{new Date(props.task.createdAt).toLocaleDateString()}</div>
        <div>
          {note.remindDate ? <Image src="alarm.png" style={{ width: 25, height: 25, marginRight: 10 }}></Image> : null}
          <Image src="close.png" style={{ width: 25, height: 25 }} onClick={() => props.deleteNote(props.task._id)}></Image>
        </div>

      </div>
      {toggleOpened ?
        <textarea name='name' onClick={(e) => e.stopPropagation()} onChange={handleChange} style={{ display: 'block', margin: 'auto', resize: 'none', overflow: 'auto', border: 'none', height: '65%', width: '85%', backgroundColor: 'transparent' }} value={note.name}></textarea> :

        <LinesEllipsis style={{ margin: 10 }}
          text={note.name}
          maxLine='5'
          ellipsis='...'
          trimRight={false}
          basedOn='letters' />
      }

      {toggleOpened && toggleOpen ?
        <div className="d-flex m-2">

          {!toggleCalendar ?
            <TaskControls></TaskControls> :
            <Calendar editNote={props.editNote}></Calendar>
          }
        </div> : null}
    </animated.div>
  )
}