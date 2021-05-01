import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import {deleteProduct, getProducts} from "./helper/adminapicall"
import {  Col, Table, Button } from 'react-bootstrap';
import ImageHepler from '../core/helper/ImageHepler';
const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user,token} = isAutheticated();
    const [loader, setloader] = useState(true);
    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data);
                setloader(false);
            }
        }).catch(err=>{})
    }

    useEffect(() => {
        preload();
    }, [])

    const deleteThisProduct = productId => {
        deleteProduct(productId,user._id,token).then( data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                preload();
            }
        }).catch(err=>{})
    }

    return (
        <>
      <h2 className="mb-4 text-center">Products</h2>
      <Link className='btn btn-outline-dark my-3' to={`/admin/dashboard`}>
        go back
      </Link>
      {loader && (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      )}
      {products.length===0 && !loader ? (
        <h2 className="text-center">NO PRODUCTS FOUND</h2>
      ):(<Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className="text-centre">PHOTO</th>
                <th className="text-center">NAME</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
          {products.map((product, index) => {
              return(
                <tr key={index}>
                  <td><Col md={2}><ImageHepler product={product} /></Col></td>
                  <td className="text-center py-4">{product.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                  >
                  <Button variant='light' className="btn-sm"><i className='fas fa-edit'></i></Button>
                </Link>
                  </td>
                <td className="text-center">
                <Button onClick={() => {
                    deleteThisProduct(product._id);
                }} variant="danger" className="btn-sm">
                  <i className='fas fa-trash'></i>
                </Button>
                  </td>
                  </tr>
              )
          })}

          </tbody>
          </Table>)}
    </>
    )
}

export default ManageProducts;