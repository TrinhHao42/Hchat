import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header isLoggedIn={false} />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", // Soft blue gradient
          padding: "5rem 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1
                className="fw-bold mb-4 display-4"
                style={{ color: "#1e3a8a" }} // Dark blue for contrast
              >
                Welcome to HChat
              </h1>
              <p className="lead mb-4 text-muted">
                Connect with friends, family, and communities in real-time. Enjoy
                secure, seamless communication across all your devices.
              </p>
              <div className="d-flex gap-3">
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="lg"
                  className="shadow-sm"
                  style={{
                    borderRadius: "25px",
                    padding: "0.75rem 2rem",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Get Started
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-dark"
                  size="lg"
                  className="shadow-sm"
                  style={{
                    borderRadius: "25px",
                    padding: "0.75rem 2rem",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Sign In
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src="/logo.png"
                alt="HChat Illustration"
                className="img-fluid rounded-3 shadow"
                style={{
                  maxHeight: "400px",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="fw-bold display-5" style={{ color: "#1e3a8a" }}>
                Why Choose HChat?
              </h2>
              <p className="text-muted">
                Discover the features that make HChat the best choice for
                communication.
              </p>
            </Col>
          </Row>
          <Row>
            {[
              {
                icon: "bi-shield-lock",
                title: "Secure Messaging",
                text: "End-to-end encryption keeps your conversations private and secure.",
              },
              {
                icon: "bi-people",
                title: "Group Chats",
                text: "Create group conversations with friends, family, or colleagues.",
              },
              {
                icon: "bi-device-ssd",
                title: "Cross-Platform",
                text: "Access your chats from any device with our web and mobile apps.",
              },
            ].map((feature, index) => (
              <Col md={4} className="mb-4" key={index}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    borderRadius: "15px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.05)";
                  }}
                >
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3">
                      <i
                        className={`bi ${feature.icon} fs-1`}
                        style={{ color: "#3b82f6" }} // Blue icon
                      ></i>
                    </div>
                    <Card.Title className="fw-semibold">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted">{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #3b82f6, #1e3a8a)", // Bold blue gradient
        }}
      >
        <Container>
          <Row>
            <Col className="text-center text-white">
              <h2 className="fw-bold mb-4">Ready to Start Chatting?</h2>
              <p className="lead mb-4">
                Join thousands of users already connecting on HChat!
              </p>
              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="shadow-sm"
                style={{
                  borderRadius: "25px",
                  padding: "0.75rem 2rem",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Create Account
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <Footer/>
    </>
  );
};

export default Home;