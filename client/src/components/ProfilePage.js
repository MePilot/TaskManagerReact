import React, { useState } from 'react';
import { Container, Form, Button, Image, ProgressBar } from 'react-bootstrap';
import axios from 'axios'

export default function ProfilePage(props) {

    const [data, setData] = useState(props.user);

    const [formControl, setFormControl] = useState({
        name: '',
        password: '',
        passwordConfirm: '',
        filepath: ''
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleFiles = (event) => {
        setData({ ...data, filepath: event.target.files[0] })
    }
    const uploadImage = () => {

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            setData({ ...data, progress: event.loaded / event.total * 100 })
        }
        xhr.onload = () => {
            window.location.reload()
        }
        const formData = new FormData()
        formData.append("avatar", data.filepath);
        xhr.open('POST', '/users/me/avatar', true);
        xhr.setRequestHeader('Authorization', props.getToken())
        xhr.send(formData);
    }

    const deleteAccount = () => {
        if (window.confirm("Are you sure!")) {
            axios.delete('/users/me', { headers: { Authorization: props.getToken() } })
                .then(() => {
                    localStorage.removeItem('JWT');
                    window.location.href = '/';
                }).catch((e) => console.log(e.response.data.error))
        }
    }

    const handleErrors = (error) => {
        const err = JSON.parse(error).errors
        const formControlCopy = { ...formControl }

        if (err && err.name) {

            formControlCopy.name = err.name.message
        }

        else formControlCopy.name = ''

        if (err && err.email) {

            formControlCopy.email = err.email.message
        }
        else formControlCopy.email = ''

        if (err && err.password) {

            formControlCopy.password = err.password.message
        }
        else formControlCopy.password = ''

        setFormControl(formControlCopy)

    }

    const formValidation = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const formControlCopy = { ...formControl }

        if (data.password !== data.passwordConfirm) {

            formControlCopy.passwordConfirm = `Passwords don't match`
            return setFormControl(formControlCopy)
        }

        else formControlCopy.passwordConfirm = ``

        axios.patch('/users/me', {

            name: data.name,
            password: data.password
        }, { headers: { Authorization: props.getToken() } }

        ).then((response) => {
            alert('OK')

        }).catch(err => {
            if (err.response) {
                handleErrors(err.response.request.response)

            } else if (err.request) {
                console.log(err.request)
                // client never received a response, or request never left
            } else {
                console.log('Some error occured')
            }
        })
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-4">
            <Form noValidate onSubmit={formValidation} >

                <Form.Group className="d-flex justify-content-center" controlId="formGroupImage">
                    <Image src={props.user.hasAvatar ? `/users/${props.user._id}/avatar` : 'user.png'} roundedCircle style={{ width: 200, height: 200 }} />
                </Form.Group>
                <Form.Group controlId="formGroupFile">
                    <Form.Control type="file" name='filepath' placeholder="Enter name" onChange={handleFiles} />
                </Form.Group>
                <Form.Group controlId="formGroupChangePhoto">
                    <Button onClick={() => uploadImage()}>Change photo</Button>
                </Form.Group>
                <Form.Group controlId="formGroupPBar">
                    <ProgressBar animated now={data.progress} />
                </Form.Group>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" isInvalid={formControl.name} value={data.name} name='name' placeholder="Enter name" onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{formControl.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" isInvalid={formControl.password} placeholder="Password" value={data.password} name='password' onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{formControl.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupConfirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" isInvalid={formControl.passwordConfirm} placeholder="Retypepassword" value={data.passwordConfirm} name='passwordConfirm' onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{formControl.passwordConfirm}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="form" className="d-flex justify-content-around">
                    <Button type="submit">Update</Button>
                    <Button onClick={() => deleteAccount()}>Delete account</Button>
                </Form.Group>

            </Form>
        </Container>

    )
}