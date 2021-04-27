import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function AboutPage() {

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={styles.card}>
                <Card.Img variant="top" src="me.jpeg" />
                <Card.Body>
                    <Card.Title>About me</Card.Title>
                    <Card.Text>
                        Hi! I am a beginner software developer and this is my first REACT FULLSTACK WEBSITE
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        Written by <a href="mailto:nebra2012@gmail.com">Slava Vorontsov</a>.<br></br>
                            Beer Sheva, Israel<br></br>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Container>
    )
}

const styles = {
    card: {

        width: '20rem'
    },
    photo: {
        width: '150px'
    },
    logos: {
        width: '50px'
    }

}
