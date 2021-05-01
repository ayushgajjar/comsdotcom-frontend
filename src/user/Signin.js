import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import FormContainer from './helper/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading:false,
              didRedirect: true
            });
          });
        }
      })
    .catch(err=>{});
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"/>
      } else {
        return <Redirect to="/"/>
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <FormContainer>
      <h1>Sign In</h1>
      <Form>
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

        <Button type='submit' onClick={onSubmit} variant='primary' disabled={loading}>
        {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {loading && <span>Signing up....</span>}
          {!loading && <span>Sign In</span>}
        </Button>
      </Form>
      <Row className="pt-2"><Col>
          <Link to="/forgotpassword">
            Forgot password?
          </Link>
          </Col>
        </Row>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to="/signup">
            Signup
          </Link>
        </Col>
        
      </Row>
    </FormContainer>
    );
  };

  return (
    <>
      
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      
    </>
  );
};

export default Signin;
