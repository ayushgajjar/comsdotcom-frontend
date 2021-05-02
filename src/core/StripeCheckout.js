import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { ListGroup, Image, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, Redirect } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";
import * as emailjs from "emailjs-com";
import Swal from 'sweetalert2'
require('dotenv').config();


const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    buttonloader:false,
    success: false,
    error: "",
    address: ""
  });
  
  const {loading, success,buttonloader, error, address} = data

  const usertoken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const useremail=isAuthenticated() && isAuthenticated().user.email;
  const username=isAuthenticated() && isAuthenticated().name;
let famount=0;
  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + (p.price*p.count);
    });
    famount=amount;
    return amount;
  };
  const successPopup=()=>{
    success && (
      Swal.fire({
        icon: 'success',
        title: 'Your Order has been Placed Successfully!',
        showConfirmButton: false,
        timer: 3000}
      )
      
    )
  }
  const SendEmail=  (data)=>{
 
    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_ORDER_TEMPLET, data,process.env.REACT_APP_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
    };
  const makePayment = token => {
    setData({
      ...data,
      loading:true,buttonloader:true
    }) 
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        
        let useraddress=token.card.name +","+token.card.address_line1+","+token.card.address_city+","+token.card.address_zip+","+token.card.address_country;
        const orderData={
            products:products,
            transaction_id:token.card.id,
            amount:famount,
            address:useraddress
        }
        const maildata={
              to_email:useremail,
              to_name:token.card.name,
              address:useraddress,
              amount:famount,
              product_name:products.name
        } 
        console.log(products.name)
        setData({
          ...data,
          success:true
        }) 
        cartEmpty(()=>{    
        })  
        setData({
          ...data,
          loading: false,
          success:true,buttonloader:false
        })
        setReload(!reload);
        createOrder(userId, usertoken, orderData);
        SendEmail(maildata);
        
      })
      .catch(error => console.log(error));
  };

  const showStripeButton = () => {
    return <>
    
    {isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey = {process.env.REACT_APP_PUB_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="comsdotcom"
        currency="inr"
        shippingAddress
        closed={()=>{if(!success && !buttonloader){setData({...data,loading:false})}}}
      >
        <Button type='button'
                className='btn-block'
                disabled={products.length === 0 || loading} onClick={() => {
                  setData({
                    loading: true
                  })}}>{loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
                  {loading && !buttonloader && <span>Please wait...</span>}
                  {!loading && <span>Proceed to Checkout</span>}
                  {buttonloader && <span>Processing...</span>}</Button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    )}
    </>
  };
  


  
  return (
    <>
    <div>
      
      {success && (
        <Alert variant="success">
        Your order is successfully placed. Check your{' '}
        <Alert.Link href={`/user/orders/${userId}`}>order here</Alert.Link>.
      </Alert>
      )}
      <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal 
              </h2>
              <i class="fa fa-inr"></i>
              {getFinalAmount()}
            </ListGroup.Item>
            <ListGroup.Item>
            {showStripeButton()}
            </ListGroup.Item>
          </ListGroup>
        </Card>
    </div>
    {successPopup()}
    </>
  );
};

export default StripeCheckout;