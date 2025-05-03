import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Thành phần tái sử dụng cho nút Show/Hide Password
const PasswordToggleButton = ({ show, toggleShow }) => (
  <Button
    variant="link"
    className="position-absolute"
    style={{
      top: '50%',
      right: '0.5rem',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      padding: '0',
      fontSize: '1.2rem',
      transition: 'color 0.2s',
    }}
    onClick={toggleShow}
    onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
    onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
    aria-label={show ? 'Hide password' : 'Show password'}
  >
    <i className={show ? 'bi bi-eye-slash' : 'bi bi-eye'} />
  </Button>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Trạng thái cho hiển thị mật khẩu

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.userName || !formData.password) {
      setError('user name and password are required');
      return;
    }

    // TODO: Implement actual login logic with API call
    try {
      // Simulate API call
      setTimeout(() => {
        // On successful login, redirect to chatroom
        navigate('/chatroom');
      }, 1000);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <Header isLoggedIn={false} />
      <Container className="py-5 mt-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card
              className="shadow-lg border-0"
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
                overflow: 'hidden',
              }}
            >
              <Card.Body className="p-5">
                <h2
                  className="text-center mb-4 fw-bold"
                  style={{ color: '#1e3a8a', fontSize: '2rem' }}
                >
                  Login to HChat
                </h2>
                {error && (
                  <Alert
                    variant="danger"
                    className="mb-4"
                    style={{
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      animation: 'fadeIn 0.3s ease-in',
                      backgroundColor: '#fee2e2',
                      border: 'none',
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 position-relative" controlId="userName">
                    <Form.Control
                      type="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="rounded-3"
                      style={{
                        borderColor: '#d1d5db',
                        padding: '0.75rem',
                        height: '50px',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        fontSize: '1rem',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(59, 130, 246, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <Form.Label
                      style={{
                        position: 'absolute',
                        top: formData.userName ? '0' : '50%',
                        left: '0.75rem',
                        transform: formData.userName
                          ? 'translateY(-50%) scale(0.85)'
                          : 'translateY(-50%)',
                        color: formData.userName ? '#3b82f6' : '#6b7280',
                        background: formData.userName ? '#ffffff' : 'transparent',
                        padding: '0 0.2rem',
                        fontSize: formData.userName ? '0.85rem' : '1rem',
                        transition: 'all 0.2s',
                        pointerEvents: 'none',
                      }}
                    >
                      User name
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-4 position-relative" controlId="password">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="rounded-3"
                      style={{
                        borderColor: '#d1d5db',
                        padding: '0.75rem 2.5rem 0.75rem 0.75rem', // Thêm padding cho nút
                        height: '50px',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        fontSize: '1rem',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(59, 130, 246, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <PasswordToggleButton
                      show={showPassword}
                      toggleShow={() => setShowPassword(!showPassword)}
                    />
                    <Form.Label
                      style={{
                        position: 'absolute',
                        top: formData.password ? '0' : '50%',
                        left: '0.75rem',
                        transform: formData.password
                          ? 'translateY(-50%) scale(0.85)'
                          : 'translateY(-50%)',
                        color: formData.password ? '#3b82f6' : '#6b7280',
                        background: formData.password ? '#ffffff' : 'transparent',
                        padding: '0 0.2rem',
                        fontSize: formData.password ? '0.85rem' : '1rem',
                        transition: 'all 0.2s',
                        pointerEvents: 'none',
                      }}
                    >
                      Password
                    </Form.Label>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-4 shadow-sm"
                    style={{
                      borderRadius: '25px',
                      padding: '0.75rem',
                      background: '#3b82f6',
                      border: 'none',
                      fontSize: '1.1rem',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                    }}
                  >
                    Login
                  </Button>
                  <div className="text-center mt-3">
                    <div className="mb-2">
                      <Link
                        to="/forgot-password"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#1e3a8a')}
                        onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center my-4"
                      style={{
                        gap: '1rem',
                        color: '#6b7280',
                        fontSize: '0.95rem',
                      }}
                    >
                      <hr
                        style={{
                          flex: 1,
                          borderColor: '#d1d5db',
                          borderWidth: '1px',
                        }}
                      />
                      <span
                        style={{
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        or login with Google
                      </span>
                      <hr
                        style={{
                          flex: 1,
                          borderColor: '#d1d5db',
                          borderWidth: '1px',
                        }}
                      />
                    </div>

                    <Button
                      variant="outline-danger" // Sử dụng variant đỏ của Bootstrap
                      className="w-100 mb-4 shadow-sm d-flex align-items-center justify-content-center"
                      style={{
                        borderRadius: '25px',
                        padding: '0.75rem',
                        fontSize: '1.1rem',
                        transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                        borderColor: '#dc3545', // Màu đỏ cho viền
                        color: '#dc3545', // Màu đỏ cho văn bản và biểu tượng
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        e.target.style.backgroundColor = '#dc3545'; // Nền đỏ khi hover
                        e.target.style.color = '#ffffff'; // Văn bản trắng khi hover
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                        e.target.style.backgroundColor = 'transparent'; // Nền trong suốt khi không hover
                        e.target.style.color = '#dc3545'; // Văn bản đỏ khi không hover
                      }}
                      onClick={() => alert('Google login is not implemented yet.')}
                    >
                      <i className="bi bi-google me-2" style={{ fontSize: '1.2rem' }} />
                      Login with Google
                    </Button>
                    <div style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                      Don't have an account?{' '}
                      <Link
                        to="/register"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#1e3a8a')}
                        onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
                      >
                        Register now
                      </Link>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;