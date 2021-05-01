
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import {addItemToCart, removeItemFromCart } from './helper/CartHelper';
import { getProductsById } from './helper/coreapicalls';
import ImageHepler from './helper/ImageHepler';
import { isAutheticated } from '../auth/helper';

const ProductDetail=({match})=>{
  const [product, setproduct] = useState("");
  const [error,seterror]=useState("");
  const [redirect, setRedirect] = useState(false);

const preload = (productId) => {
    getProductsById(productId).then(data=>{
        if(data.error)
        {
            seterror(data.error)
        }
        else
        {
          setproduct(data)
        }
    }).catch(err=>{})
}

useEffect(() => {
    preload(match.params.productId);
  }, []);

  const addToCart = () => {
    addItemToCart(product,0, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
return (
    <>
      <Link className='btn btn-outline-dark my-3' to='/'>
        Go Back
      </Link>
      {getARedirect(redirect)}
      <Row>
            <Col md={6}>
              
              <ImageHepler product={product} />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                
                <ListGroup.Item>Price: <i class="fa fa-inr"></i>{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong><i class="fa fa-inr"></i>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  

                  {isAutheticated() ? isAutheticated().user.role ===0 && (<ListGroup.Item>
                   <Button
                      onClick={addToCart}
                      className='btn-block'
                      type='button'
                      disabled={product.stock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>):(<ListGroup.Item>
                   <Button
                      onClick={addToCart}
                      className='btn-block'
                      type='button'
                      disabled={product.stock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>)}
                </ListGroup>
              </Card>
            </Col>
          </Row>

    </>
)
}  
export default ProductDetail;