import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import logo from '/logo.png'; // Assumes logo.png is in the public folder

const Header = ({ isLoggedIn, username }) => {
  const [expanded, setExpanded] = useState(false);

  // Nếu đã đăng nhập thì không hiển thị header này
  if (isLoggedIn) return null;

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="shadow-sm"
      style={{
        background: 'linear-gradient(90deg, #f8f9fa, #e9ecef)',
        padding: '0.5rem 1rem',
      }}
    >
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block me-2 rounded-circle"
            alt="HChat Logo"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>

        {/* Custom Toggle for Mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: '#5468ff',
            color: 'white'
          }}>
            <BsList size={24} />
          </div>
        </Navbar.Toggle>

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* Mobile View - Direct Links */}
            <div className="d-lg-none mt-3 mb-2">
              <Link
                to="/login"
                className="d-block w-100 btn btn-outline-primary mb-3 py-2"
                style={{ borderRadius: '10px' }}
                onClick={() => setExpanded(false)}
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="d-block w-100 btn btn-primary py-2"
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#5468ff',
                  border: 'none'
                }}
                onClick={() => setExpanded(false)}
              >
                Đăng ký
              </Link>
            </div>

            {/* Desktop View - Buttons */}
            <div className="d-none d-lg-flex align-items-center">
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="mx-2"
                style={{ borderRadius: '20px', padding: '0.4rem 1.2rem' }}
              >
                Đăng nhập
              </Button>

              <Button
                as={Link}
                to="/register"
                className="mx-2"
                style={{
                  borderRadius: '20px',
                  padding: '0.4rem 1.2rem',
                  backgroundColor: '#5468ff',
                  border: 'none',
                }}
              >
                Đăng ký
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;