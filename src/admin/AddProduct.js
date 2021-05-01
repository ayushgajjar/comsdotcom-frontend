import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../user/helper/FormContainer'

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    }).catch(err=>{})
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error,loading:false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h5>{createdProduct} created successfully</h5>
    </div>
  );

  const warningMessage = () => {
    if(error){
        return <h5 className="alert alert-danger mt-3">Failed to create category</h5>
    }
  };
  const createProductForm = () => (
    <FormContainer>
        <h1>Create Product</h1>
        
          <Form>
            
          {successMessage()}
            {warningMessage()}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={handleChange("name")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='name'
                placeholder='Description'
                value={description}
                onChange={handleChange("description")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={handleChange("price")}
              ></Form.Control>
            </Form.Group>

            

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={handleChange("category")}>
                <option>Select</option>
                {categories &&
                  categories.map((cate, index) => (
                    <option key={index} value={cate._id}>
                      {cate.name}
                    </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='stock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Stock'
                value={stock}
                onChange={handleChange("stock")}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='photo'>
              <Form.Label>Image</Form.Label>
              <Form.File
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            
          ></Form.File>
            </Form.Group>

            <Button type='submit' onClick={onSubmit} variant='primary' disabled={loading}>
            {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {loading && <span>Creating...</span>}
          {!loading && <span>Create Product</span>}
            </Button>
          </Form>
        
      </FormContainer>
  );

  return (
    <>
      <Link to="/admin/dashboard" className='btn btn-outline-dark my-3'>
        go back
      </Link>
          {createProductForm()}
       
    </>
  );
};

export default AddProduct;
