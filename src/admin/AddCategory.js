import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import FormContainer from '../user/helper/FormContainer';
import { createCategory } from './helper/adminapicall';
import { Form, Button } from 'react-bootstrap'

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setloading] = useState(false);

    const {user,token} = isAutheticated();

    const goBack= () => (
        <div>
            <Link className='btn btn-outline-dark my-3' to="/admin/dashboard">
                go back
            </Link>

        </div>
    )
    
    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setloading(true);
        setError("");
        setSuccess(false)

        //backend request
        createCategory(user._id,token,{name})
        .then(data => {
            if(data.error)
            {
                    setError(error);
                    setloading(false);
            }
            else{
                setError("");
                setSuccess(true);
                setloading(false);
                setName("");
            }
        }).catch(err=>{})
    }

    const successMessage = () => {
        if(success){
            return <h5 className="alert alert-success mt-3">Category created successfully</h5>
        }
    };
    
    const warningMessage = () => {
        if(error){
            return <h5 className="alert alert-danger mt-3">Failed to create category</h5>
        }
    };

    const myCatogoryForm = () => (
        <FormContainer>
            <h1>Create Category</h1>
            <Form>
            {successMessage()}
            {warningMessage()}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' onClick={onSubmit} variant='primary' disabled={loading}>
            {loading && (<i className="fa fa-refresh fa-spin " style={{ marginRight:"5px"}}/>)}
          {!loading && <span>Add Category</span>}
          {loading && <span>Adding...</span>}
            </Button> 
            </Form>
        </FormContainer>
    )

    return (
        <>
            {goBack()}   
            {myCatogoryForm()}
        </>
    )
}


export default AddCategory;