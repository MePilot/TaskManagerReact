
import {Nav,Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function LogRes() {
  let history = useHistory();
  
  return (
    <Nav className="ml-auto">
      <Button variant="outline-warning" className="m-2" onClick={()=>history.push('/registration')} role="button">Register</Button>
      <Button variant="outline-warning" className="m-2" onClick={()=>history.push('/login')} role="button">Login</Button>
    </Nav>
  )
}