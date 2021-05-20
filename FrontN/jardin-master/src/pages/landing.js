import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Landing = () => {
  const [element, setElement] = useState(<Login />);
  const login=()=>{
      setElement(<Login/>)
  }

  const signup = ()=>{
      setElement(<Signup/>)
  }

  return (
    <div style={{marginTop:"5%"}}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <Card className="text-center">
              <Card.Header>
                <Button variant="primary" style={{marginRight:"50px"}} onClick={login}>Connextion</Button>
                <Button variant="info" onClick={signup}>Inscription</Button>
              </Card.Header>
            </Card>
            <Card>
              <Card.Body>{element}</Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
