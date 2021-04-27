import {Image, Container, Row } from 'react-bootstrap';

export default function HomePage() {

  return (

    <Container style={{ marginTop: 150 }}>
      <Row>
        <Container className="d-flex justify-content-center">
          <h4 style={styles.desc}>
            Create your profile. Store and manage your tasks and notes. Receive reminder emails.
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