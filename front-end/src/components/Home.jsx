import { Button, Col, Row } from "react-bootstrap"
import '../styles/index.css'
const Home =()=> {
    return(
            <Row className="main">
                <Col md={2} className="sidebar">
                    <h2>Sidebar Settings</h2>
                    <Button variant="success" style={{width:"10vw"}}>Primary</Button>
                </Col>
                <Col md={10} className="body">
                    <h1>Main</h1>
                </Col>
            </Row>
    )
}
export default Home