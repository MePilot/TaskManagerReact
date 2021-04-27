
import { Nav, DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
export default function LoggedIn(props) {
    let history = useHistory();

    return (
        <Nav className="ml-auto">
            <DropdownButton variant="outline-warning" title={
                <span>
                    <Image src={props.user.hasAvatar ? `/users/${props.user._id}/avatar` : 'user.png'} roundedCircle style={{ width: 50, height: 50, marginRight: 10 }} />
                    <span>{props.user.name}</span>
                </span>
            }>
                <Dropdown.Item onClick={() => history.push('/profile')}>Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => props.logOut()}>Log out</Dropdown.Item>
            </DropdownButton>
        </Nav>
    )
}