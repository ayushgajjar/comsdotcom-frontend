import React, {Fragment} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {  withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index"; 
import Swal from 'sweetalert2'
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#D6EAF8" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <header>
      <Navbar className="py-2" bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer style={currentTab(history, "/")} to='/'>
            <Navbar.Brand>comsdotcom</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            
            <Nav className='ml-auto'>
            {isAuthenticated() && isAuthenticated().user.role ===0 && (<LinkContainer style={currentTab(history, "/cart")} to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>)}

              {isAuthenticated() && isAuthenticated().user.role ===0 && (
                <LinkContainer style={currentTab(history, "/user/dashboard")}  to='/user/dashboard'>
                  <Nav.Link>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              )}

              {isAuthenticated() && isAuthenticated().user.role===1 && (
                <LinkContainer style={currentTab(history, "/admin/dashboard")}  to='/admin/dashboard'>
                  <Nav.Link>
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              )}

              {!isAuthenticated() && (
                <Fragment>
                  <LinkContainer style={currentTab(history, "/cart")} to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>)
                  <LinkContainer style={currentTab(history, "/signup")}  to='/signup'>
                    <Nav.Link>
                      Signup
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer style={currentTab(history, "/signin")}  to='/signin'>
                    <Nav.Link>
                      Signin
                    </Nav.Link>
                  </LinkContainer>
                  
                </Fragment>
              )}
              {isAuthenticated() && (

                <LinkContainer to="/" onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#525453',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Sign Out'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      signout(() => {
                        history.push("/")
                      })
                    }
                  })
                  
                  
                }}>
                  <Nav.Link>
                    Signout
                  </Nav.Link>
                </LinkContainer>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  
);

export default withRouter(Menu);

