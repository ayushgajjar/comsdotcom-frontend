import React, {useState} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHepler from './helper/ImageHepler';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


const Pcard = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    //   function(f){return f}
    reload = undefined
  }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
    
  
    const cartTitle = product ? product.name : "A photo from pexels";
    const cartDescrption = product ? product.description : "Default description";
    const cartPrice = product ? product.price : "DEFAULT";
  
    const addToCart = () => {
      addItemToCart(product,0, () => setRedirect(true));
    };
  
    const getARedirect = redirect => {
      if (redirect) {
        return <Redirect to="/cart" />;
      }
    };  

    return (
      <Card className='my-3 p-3 rounded'>
          {getARedirect(redirect)}
          <Link
            to={`product/${product._id}`}
          >
          <ImageHepler product={product} />
          </Link>
        <Card.Body>
        <Link
            to={`product/${product._id}`}
          >
            <Card.Title as='h5'>
              <name>{cartTitle}</name>
            </Card.Title>
            </Link>

          <Card.Text as='h5'><i class="fa fa-inr"></i>{cartPrice}</Card.Text>      
          
          

          {removeFromCart && (
            <Button onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload)}} className='btn-block' type='button'>
                Remove from cart
            </Button>
          )}
         {removeFromCart && (<h5>Quantity : {product.count}</h5>
                         )}       
        </Card.Body>
      </Card>
    );
  };
  
  export default Pcard;
