import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import * as emailjs from "emailjs-com";
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './helper/FormContainer'
import {wel_message1} from '../backend';
require('dotenv').config();

const Signup = () => {

  const strength=undefined;
  const color=undefined;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password:"",
    error: "",
    loading:false,
    success: false,
    didRedirect: false
  });

  const { name, email, password,confirm_password, error,loading, success, didRedirect } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const SendEmail=  (email,name)=>{
 
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLET_ID, {
        to_email:email,
        to_name:name,
        message1:wel_message1
    },process.env.REACT_APP_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
    };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false,loading:true });
    if(password!==confirm_password)
    {
      setValues({ ...values, error: "password and confirm password not match",loading:false, success: false });
    }
    else if(!new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
    {
      setValues({ ...values, error: "email is not valid", loading:false,success: false });
    }
    else if(new RegExp(/[0-9]/).test(password) && new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password) && new RegExp(/[!#@$%^&*)(+=._-]/).test(password))
    {
      signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error,loading:false ,success: false });
        } else {
          {SendEmail(email,name)};
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            confirm_password:"",
            error: "",
            loading:false,
            success: true,
            didRedirect: false
          });
        }
      })
      .catch(err=>{});
    }
    else{
      setValues({ ...values, error: "password must be contain special character, small and capital letter and number ", loading:false,success: false });
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />
    }
  };

  const signUpForm = () => {
    return (
      <FormContainer>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={handleChange("name")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={handleChange("email")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={handleChange("password")}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirm_password}
            onChange={handleChange("confirm_password")}
          ></Form.Control>
        </Form.Group>
        
        <Button onClick={onSubmit} type='submit' variant='primary' disabled={loading}>
          {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {loading && <span>Signing up....</span>}
          {!loading && <span>Signing up</span>}
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to="/signin">
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Thanks for registering. Please Check your mail to verify account
            
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {performRedirect()}
    </>
  );
};

export default Signup;
