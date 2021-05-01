import React,{useState,useEffect} from "react";
import Pcard from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Row, Col,Form } from 'react-bootstrap'

export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [loader, setloader] = useState(true);
  const loadAllProduct = () => {
    getProducts().then(data => {
      if(data.error){
        setError(data.error);
      }
      else{
        setProducts(data);
        setloader(false);
      }
    }).catch(err=>{})
  }
  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
    setReload(!reload);
};

  useEffect(() => {
    loadAllProduct()
    
  }, [reload])

  return (
    <>
     
      
      <Form.Group controlId='search' className="search">
              <Form.Control 
                type='name'
                placeholder='&#xF002;   Search Products'
                value={search}
                onChange={handleChange}
                className='searchbox'
              ></Form.Control>
      </Form.Group>
      {(search=="") && (<h1>Latest Products</h1>)}
      {loader && (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      )}
      <Row>
          {products.map((product, index) => (
            product.name.toLowerCase().match(`${search}`) && (<Col key={index} sm={12} md={6} lg={4} xl={3}>
             <Pcard product={product} />
            </Col>)
          ))}
      </Row>
    </>
  );
}
