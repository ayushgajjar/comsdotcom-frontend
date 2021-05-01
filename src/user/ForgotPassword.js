import React, { useState } from "react";
import FormContainer from './helper/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { getPasswordLink } from "./helper/userapicalls";


 const ForgotPassword = () => {

    const [values, setValues] = useState({
        email: "",
        error: "",
        loading:false,
        success: false,
      });

      const { email,loading, error,success} = values;

      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false ,loading:true});
        getPasswordLink({email})
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error,success:false,loading:false});
            } else {
              setValues({...values, email:"" ,success:true,error:"",loading:false})
              
            }
          })
          .catch(console.log("Forgot Pssswrodrequest failed"));
      };

      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left pt-3">
              <div
                className="alert alert-danger "
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-mt-6 offset-sm-3 text-left pt-3">
              <div
                className="alert alert-success "
                style={{ display: success ? "" : "none" }}
              >
                Password Change request send to your register mail account
                
              </div>
            </div>
          </div>
        );
      };

    const forgotPasswordForm = () => {
        return (
          <FormContainer>
          <h1>Forgot Password</h1>
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
    
            
    
            <Button type='submit' onClick={onSubmit} variant='primary' disabled={loading}>
            {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {loading && <span>Sending....</span>}
          {!loading && <span>Forgot Password</span>}
            </Button>
          </Form>
    
        </FormContainer>
        );
      };

    return (
        <>
        {forgotPasswordForm()}
        {errorMessage()}
        {successMessage()}
        </>
    )
}


export default ForgotPassword;