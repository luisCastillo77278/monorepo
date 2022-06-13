import React, { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="dark" expand="md" variant="dark">
    <Container>
      <Navbar.Brand>React</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/notes">Notes</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/create-note">create note</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;