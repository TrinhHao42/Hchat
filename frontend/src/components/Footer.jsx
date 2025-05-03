import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer
        style={{
          background: '#1e3a8a',
          color: '#ffffff',
          padding: '1.5rem 0',
          marginTop: 'auto',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col className="text-center" style={{ fontSize: '1.3rem' }}>
              <p style={{ margin: 0 }}>© 2025 HChat. All rights reserved. Creater Razo</p>
            </Col>
          </Row>
        </Container>
      </footer>
  )
}
