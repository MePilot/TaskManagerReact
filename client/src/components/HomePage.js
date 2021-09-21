import { Image, Container, Row } from 'react-bootstrap';

export default function HomePage() {

  return (

    <Container style={{ height: window.innerHeight }}>
      <Row className="h-100">
        <Container className="my-auto">
          <Row>
            <Container className="d-flex justify-content-center align-items-center">
              <h4 style={styles.desc}>
                Create your profile. Store and manage your notes. Receive reminder emails.
              </h4>
            </Container>

          </Row>
          <Row>
            <Container className="d-flex justify-content-center align-items-center">
              <Image src="logo192.png" rounded style={styles.logos} />
              <Image src="nodejs.png" rounded style={styles.logos} />
              <Image src="mongodb.png" rounded style={styles.logos} />
            </Container>
          </Row>
        </Container>
      </Row>
    </Container>

  )
}
const styles = {

  desc: {
    textAlign: 'center',
    margin: '5%',
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 10,
    padding: 10
  },

  logos: {
    width: '15%',
    margin: '5%'
  }

}