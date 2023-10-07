
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';


const Header = () => {
 

  return (
    <Navbar  bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/">داشبورد</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">خانه</NavLink>
          <NavLink className="nav-link" to="/todos">آیکن ها</NavLink>
          <NavLink className="nav-link" to="/exit">خروج</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
