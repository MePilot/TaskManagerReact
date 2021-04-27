
import axios from 'axios'
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';

export default function Registration(props) {

    const [data, setData] = useState({});
    const [formControl, setFormControl] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleErrors = (error) => {
        const err = JSON.parse(error).errors
        const formControlCopy = { ...formControl }

        if (data.password !== data.passwordConfirm) {
            formControlCopy.passwordConfirm = `Passwords don't match`
        }

        else formControlCopy.passwordConfirm = ``

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

    const formValidation = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        axios.post('/users', {

            name: data.name,
            email: data.email,
            password: data.password

        }

        ).then((response) => {
            localStorage.setItem('JWT', response.data.token);
            props.setToken(response.data.token)
            props.history.push('/')

        }).catch(err => {
            if (err.response) {
                handleErrors(err.response.request.response)
               
            } else if (err.request) {
                console.log('Error')
                // client never received a response, or request never left
            } else {
                console.log('Error')
            }
        })
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Form noValidate onSubmit={formValidation}>

                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" isInvalid={formControl.name} value={data.name} name='name' placeholder="Enter name" onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{formControl.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" isInvalid={formControl.email} value={data.email} placeholder="Enter email" name='email' onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">{formControl.email}</Form.Control.Feedback>
                    </InputGroup>
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
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    )
}
