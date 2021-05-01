import React from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { Row, Col } from 'react-bootstrap'


const UserDashBoard = () => {

    const {
        user: { _id,name, email}
      } = isAutheticated();

    const adminLeftSide = () => {
        return (
          <div className="card">
            <h4 className="card-header text-center bg-dark text-white">User Navigation</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to={`/user/orders/${_id}`} className="nav-link text-center">
                  Your Orders
                </Link>
              </li>
              <li className="list-group-item">
                <Link to="/user/setting" className="nav-link text-center">
                  Setting
                </Link>
              </li>
              
              
            </ul>
          </div>
        );
      };
    
      const adminRightSide = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header text-center">User Information</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge alert-success mr-2">Name:</span> {name}
              </li>
              <li className="list-group-item">
                <span className="badge alert-success mr-2">Email:</span> {email}
              </li>
    
              <li className="list-group-item">
                <span className="badge alert-danger">User Area</span>
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

export default UserDashBoard;
