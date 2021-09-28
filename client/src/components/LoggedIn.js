
import {NavDropdown,Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
export default function LoggedIn(props) {
    let history = useHistory();

    return (
        
            <NavDropdown alignRight title={
                <span>
                    <Image src={props.user.hasAvatar ? `/users/${props.user._id}/avatar` : 'user.png'} roundedCircle style={{ width: 45, height: 45, marginRight: 10 }} />
                    <span>{props.user.name} </span>
                </span>
            }>
                <NavDropdown.Item eventKey="1" onClick={() => history.push('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="2" onClick={() => props.logOut()}>Log out</NavDropdown.Item>
            </NavDropdown >
       
    )
}