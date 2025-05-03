import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.username || !formData.phone || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // TODO: Implement actual registration logic with API call
    try {
      // Simulate API call
      setTimeout(() => {
        setSuccess(true);
      }, 1000);
    } catch (err) {
      setError('Registration failed. Please try again.');
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
                background: 'linear-gradient(135deg, #ffffff, #f1f5f9)', // Subtle gradient
                overflow: 'hidden',
              }}
            >
              <Card.Body className="p-5">
                <h2
                  className="text-center mb-4 fw-bold"
                  style={{ color: '#1e3a8a', fontSize: '2rem' }}
                >
                  Create an Account
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
                {success ? (
                  <Alert
                    variant="success"
                    className="mb-4"
                    style={{
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      animation: 'fadeIn 0.3s ease-in',
                      backgroundColor: '#d1fae5',
                      border: 'none',
                    }}
                  >
                    Registration successful! You can now{' '}
                    <Link
                      to="/login"
                      style={{
                        color: '#1e3a8a',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                      onMouseLeave={(e) => (e.target.style.color = '#1e3a8a')}
                    >
                      login
                    </Link>
                    .
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 position-relative" controlId="username">
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
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
                          top: formData.username ? '0' : '50%',
                          left: '0.75rem',
                          transform: formData.username
                            ? 'translateY(-50%) scale(0.85)'
                            : 'translateY(-50%)',
                          color: formData.username ? '#3b82f6' : '#6b7280',
                          background: formData.username ? '#ffffff' : 'transparent',
                          padding: '0 0.2rem',
                          fontSize: formData.username ? '0.85rem' : '1rem',
                          transition: 'all 0.2s',
                          pointerEvents: 'none',
                        }}
                      >
                        Username
                      </Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-4 position-relative" controlId="phone">
                      <Form.Control
                        type="phone"
                        name="phone"
                        value={formData.phone}
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
                          top: formData.phone ? '0' : '50%',
                          left: '0.75rem',
                          transform: formData.phone
                            ? 'translateY(-50%) scale(0.85)'
                            : 'translateY(-50%)',
                          color: formData.phone ? '#3b82f6' : '#6b7280',
                          background: formData.phone ? '#ffffff' : 'transparent',
                          padding: '0 0.2rem',
                          fontSize: formData.phone ? '0.85rem' : '1rem',
                          transition: 'all 0.2s',
                          pointerEvents: 'none',
                        }}
                      >
                        Phone
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
                          padding: '0.75rem 2.5rem 0.75rem 0.75rem', // Extra padding for button
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
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} />
                      </Button>
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

                    <Form.Group className="mb-4 position-relative" controlId="confirmPassword">
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="rounded-3"
                        style={{
                          borderColor: '#d1d5db',
                          padding: '0.75rem 2.5rem 0.75rem 0.75rem', // Extra padding for button
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        onMouseEnter={(e) => (e.target.style.color = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} />
                      </Button>
                      <Form.Label
                        style={{
                          position: 'absolute',
                          top: formData.confirmPassword ? '0' : '50%',
                          left: '0.75rem',
                          transform: formData.confirmPassword
                            ? 'translateY(-50%) scale(0.85)'
                            : 'translateY(-50%)',
                          color: formData.confirmPassword ? '#3b82f6' : '#6b7280',
                          background: formData.confirmPassword ? '#ffffff' : 'transparent',
                          padding: '0 0.2rem',
                          fontSize: formData.confirmPassword ? '0.85rem' : '1rem',
                          transition: 'all 0.2s',
                          pointerEvents: 'none',
                        }}
                      >
                        Confirm Password
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
                      Register
                    </Button>

                    <div className="text-center mt-3" style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                      Already have an account?{' '}
                      <Link
                        to="/login"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#1e3a8a')}
                        onMouseLeave={(e) => (e.target.style.color = '#3b82f6')}
                      >
                        Login
                      </Link>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Register;