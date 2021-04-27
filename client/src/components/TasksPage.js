import axios from 'axios'
import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import TasksBar from './TasksBar';
import Task from './Task';

export default function TaskPage(props) {

    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState('createdAt:desc');

    const addNote = async () => {

        try {
            const res = await axios.post('/tasks', { name: 'Empty task' }, { headers: { Authorization: props.token } })
            setTasks([...tasks, res.data])
        }
        catch (e) {
            console.log('Error')
        }
    }

    const editNote = async (note) => {

        try {
            const res = await axios.patch(`/tasks/${note._id}`, { name: note.name, remindDate: note.remindDate }, { headers: { Authorization: props.token } })
            let newTasks = [...tasks]
            newTasks = newTasks.map(task => (task._id === res.data._id) ? res.data : task)

            setTasks(newTasks)
        }

        catch (e) {
            alert(e)
        }
    }

    const deleteNote = async (id) => {

        try {
            await axios.delete(`/tasks/${id}`, { headers: { Authorization: props.token } })
            setTasks(tasks.filter((task) => task._id !== id))
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        axios.get(`/tasks?${sortBy}`, { headers: { Authorization: props.token } }).then((res) => {
            setTasks(res.data)
        })
            .catch((e) => console.log(e))
    }, [sortBy,props.token]);

    return (

        <Container>
            <TasksBar addNote={addNote} setSortBy={setSortBy}></TasksBar>
            <Container className='d-flex justify-content-center flex-wrap'>
                {tasks.map((task, i) => {
                    return <Task key={i} task={task} token={props.token} deleteNote={deleteNote} editNote={editNote}></Task>
                })
                }
            </Container>
        </Container>
    )
}