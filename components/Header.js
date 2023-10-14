
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';


const saber = () => {

  return 'مدیر'
}

const Header = () => {


  return (
    <Navbar bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <NavLink className="nav-link" to="/">خانه</NavLink>
            <NavDropdown title="سرویس ها" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/services">لیست سرویس ها</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/create">ایجاد سرویس</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/create">ایجاد بخش</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                تغییر مقادیر اصلی
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink className="nav-link" to="/exit">خروج</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand href="/">داشبورد</Navbar.Brand>
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            شما با کاربری: <a href="#login">{saber()}</a> وارد شده اید.
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
