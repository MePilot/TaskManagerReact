import React, { useState } from 'react';
import axios from 'axios'
import { Container, Form, Button, InputGroup,Row } from 'react-bootstrap';

export default function LoginPage(props) {

    const [data, setData] = useState({});
    const [formControl, setFormControl] = useState({
        email: '',
        password: '',
    });

    const handleErrors = (error) => {
       
        const formControlCopy = {...formControl}

        if (error.status===400) {
            formControlCopy.password='No user with this email/password!'
        }
        else formControlCopy.password=''

        setFormControl(formControlCopy)
       
    }

    const formValidation = (event) => {
        event.preventDefault();
        event.stopPropagation();
       
        axios.post('/users/login', {
            "email": data.email,
            "password": data.password
        }
        ).then((response) => {
            localStorage.setItem('JWT', response.data.token);
          
            props.setToken(response.data.token)
            props.history.push('/')

        }).catch(err => {
            if (err.response) {
                handleErrors(err.response.request)
               
            } else if (err.request) {
                alert(err.request)
                // client never received a response, or request never left
            } else {
                alert('else')
            }
        })
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    return (
        <Container style={{ height: window.innerHeight }}>
      <Row className="h-100">
        <Container className="my-auto">
        <Form noValidate onSubmit={formValidation} style={{borderStyle:'solid', padding:15}}>
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
                <Button type="submit">Login</Button>
            </Form>
        </Container>
      </Row>
    </Container>
        
    )
}