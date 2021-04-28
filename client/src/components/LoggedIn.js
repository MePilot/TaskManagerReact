
import { Nav, NavDropdown,Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
export default function LoggedIn(props) {
    let history = useHistory();

    return (
        <Nav className="ml-auto">
            <NavDropdown className = "btn btn outline-warning" title={
                <span>
                    <Image src={props.user.hasAvatar ? `/users/${props.user._id}/avatar` : 'user.png'} roundedCircle style={{ width: 50, height: 50, marginRight: 10 }} />
                    <span>{props.user.name}</span>
                </span>
            }>
                <NavDropdown.Item onClick={() => history.push('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => props.logOut()}>Log out</NavDropdown.Item>
            </NavDropdown >
        </Nav>
    )
}