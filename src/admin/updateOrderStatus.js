import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { getOrder,updateStatus } from './helper/adminapicall';
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../user/helper/FormContainer'
import * as emailjs from "emailjs-com";
import {success_message,status_message} from "../backend";

const UpdateOrderStatus = ({match}) => {

    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [useremail, setUseremail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setloading] = useState(false);
    const allStatus=["Cancelled", "Delivered", "Shipped", "Processing"];
    const {user,token} = isAutheticated();
    const SendEmail=  (email,name)=>{
 
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLET_ID, {
            to_email:email,
            to_name:name,
            status_message:status_message,
            status:status,
            success:success_message
        },process.env.REACT_APP_USER_ID)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          }).catch(err=>{})
        };
    const preload = (orderId) => {
        getOrder(orderId).then(data=>{
            
            if(data.error)
            {
                setError(data.error);
            }
            else
            {
                const order=data[0];
                setStatus(order.status);
                setUseremail(order.user.email);
                setUsername(order.user.name);
            }
        }).catch(err=>{})
    }
    const preloadStatus = ()=>{    
    }
    useEffect(() => {
        preload(match.params.orderId);
      }, []);

    const goBack= () => (
        <div >
            <Link className='btn btn-outline-dark my-3' to="/admin/dashboard">
            go back
            </Link>

        </div>
    )
    
    const handleChange = (event) => {
        setError("");
        setStatus(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setloading(true);
        setError("");
        setSuccess(false)
        //backend request
        updateStatus(match.params.orderId,user._id,token,{status})
        .then(data => {
            if(data.error)
            {
                    setError(error);
                    setloading(false);
            }
            else{
                SendEmail(useremail,username)
                setError("");
                setSuccess(true);
                setStatus("");
                setloading(false);
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h5 className="alert alert-success mt-3">Order status updated successfully</h5>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h5 className="alert alert-danger mt-3">Failed to update order status</h5>
        }
    };

    const updateOrderStatusForm = () => (
        <FormContainer>
            <h1>Update Order Status</h1>
            <Form>
            {successMessage()}
            {warningMessage()}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control as= "select"
                onChange={handleChange}
              >
                  <option>{status}</option>
                  {allStatus &&
                    allStatus.map((stat, index) => (
                    <option key={index} >
                        {stat}
                    </option>
                    ))}
              </Form.Control>
            </Form.Group>

            <Button type='submit' onClick={onSubmit} variant='primary' disabled={loading}>
            {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {loading && <span>Updating...</span>}
          {!loading && <span>Update Status</span>}
            </Button> 
            </Form>
        </FormContainer>
        
    )

    return (
        <>
        {goBack()}
        {updateOrderStatusForm()}
        </>
    )
}


export default UpdateOrderStatus;