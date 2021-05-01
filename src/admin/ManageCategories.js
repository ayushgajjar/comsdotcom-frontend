import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import {deleteCategory, getCategories} from "./helper/adminapicall"
import { Table, Button } from 'react-bootstrap';

const ManageCategories = () => {
    const [Categories, setCategories] = useState([]);
    const {user,token} = isAutheticated();
    const [loader, setloader] = useState(true)
    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategories(data);
                setloader(false)
            }
        }).catch(err=>{})
    }

    useEffect(() => {
        preload();
    }, [])

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId,user._id,token).then( data => {
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
      <h2 className="mb-4 text-center">Categories</h2>
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
      {Categories.length===0 && !loader ? (
        <h2 className="text-center">NO CATEGORY FOUND</h2>
      ):(<Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                <th className="text-center">NAME</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {Categories.map((category, index) => {
              return(
                <tr key={index}>
                  <td className="text-center py-4">{category.name}</td>
                  <td className="text-center">
                  <Link
                    to={`/admin/category/update/${category._id}`}
                  >
                  <Button variant='light' className="btn-sm"><i className='fas fa-edit'></i></Button>
                </Link>
                  </td>
                <td className="text-center">
                <Button onClick={() => {
                    deleteThisCategory(category._id);
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

export default ManageCategories;