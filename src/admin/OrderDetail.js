import React,{useState,useEffect} from 'react'
import { getOrder } from './helper/adminapicall';
import { Link } from 'react-router-dom';
import ImageHepler from '../core/helper/ImageHepler';
import { Row, Col, ListGroup, Card } from 'react-bootstrap'


const OrderDetail = ({match}) => {

    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        status: "",
        amount: "",
        address: "",
        transaction_id:"",
        orderDate:"",
        products:[],
        error:""


      });
    
      const {
        id,
        name,
        email,
        status,
        amount,
        address,
        transaction_id,
        orderDate,
        products,
        error
      } = values;

    
    const preload = (orderId) => {
        getOrder(orderId).then(data=>{
            if(data.error)
            {
                setValues({ ...values, error: data.error });
            }
            else
            {
              const order=data[0];
                setValues({
                    ...values,
                    id: order._id,
                    name : order.user.name,
                    email: order.user.email,
                    status : order.status,
                    amount: order.amount,
                    address: order.address,
                    transaction_id: order.transaction_id,
                    products: order.products,
                    orderDate:order.createdAt
                })
            }
        }).catch(err=>{})
    }

    useEffect(() => {
        preload(match.params.orderId);
      }, []);


    return (
        <>

        <h1 className="text-center">Order {id}</h1>
        
        <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {name}
              </p>
              <p>
                <strong>Email: </strong>{' '}{email}
              </p>
              <p>
                <strong>Address:</strong>
                {' '}{address}
              </p>
              <p>
                <strong>Order Date:</strong>
                {' '}{orderDate}
              </p>
              <p>
                <strong>Status:</strong> {status}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              
                <ListGroup variant='flush'>
                  {products.map((product, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <ImageHepler product={product} />
                        </Col>
                        <Col>
                          <Link to={`/product/${product._id}`}>
                            {product.name}
                          </Link>
                        </Col>
                        <Col>
                        <i class="fa fa-inr"></i>{product.price}
                        </Col>
                        <Col>
                          Quantity : {product.count}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>             
      
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col><i class="fa fa-inr"></i>{amount}</Col>
                </Row>
              </ListGroup.Item>
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Link className='btn btn-outline-dark my-3' to={`/admin/orders`}>
        go back
      </Link>

        </>
    )
}

export default OrderDetail;

