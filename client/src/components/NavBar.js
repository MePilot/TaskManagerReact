import { Navbar, Nav } from 'react-bootstrap';
import LogRes from './LogRes';
import LoggedIn from './LoggedIn';
import { useHistory } from "react-router-dom";

export default function NavBar(props) {
  let history = useHistory();

  return (
   
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={()=>history.push('/')}>Task Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>history.push('/')}>Home</Nav.Link>
          <Nav.Link  onClick={()=>history.push('/about')}>About</Nav.Link>
          {props.user ? <Nav.Link onClick={()=>history.push('/mytasks')}>My tasks</Nav.Link> : null}
        </Nav>
          <Nav>
          {!props.user ? <LogRes></LogRes> : <LoggedIn user={props.user} logOut={props.logOut}></LoggedIn>}
          </Nav>
   
      </Navbar.Collapse>
      
    </Navbar>
  )
}