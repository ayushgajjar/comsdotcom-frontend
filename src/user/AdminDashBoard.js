import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'

const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header text-center bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-center">
              <h6>Create Categories</h6>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-center" >
              <h6>Manage Categories</h6>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-center">
              <h6>Create Product</h6>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-center">
            <h6>Manage Products</h6>
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-center">
            <h6>Manage Orders</h6>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h3 className="card-header text-center">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge alert-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge alert-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge alert-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <Row className="py-5">
        <Col>{adminLeftSide()}</Col>
        <Col sm={12} md={8}>{adminRightSide()}</Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;
