import { useContext } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserContext from "../UserContext";

export default function Dashboard() {

    const {currentUser} = useContext(UserContext);

    if(!currentUser){
        return <Redirect to="/" />;
    }

    return (
        <>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Body>$51,130.69 <br />Value
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>+$252.63 (0.49%) <br />Day's Gain/Loss
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>+$2,948.78 <br /> Gain/Loss
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Button className="mb-3" variant="primary">Add Stock</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Security</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Gain/Loss</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>APPL <br /> Apple Inc</td>
                        <td>151.12</td>
                        <td>70</td>
                        <td>8933.86</td>
                        <td>+1660</td>
                        <td>10594</td>
                        <td><a href="/buy">Buy</a> | <a href="/sell">Sell</a></td>

                    </tr>
                    <tr>
                        <td>MSFT <br /> Microsoft Corp</td>
                        <td>151.12</td>
                        <td>70</td>
                        <td>8933.86</td>
                        <td>+1660</td>
                        <td>10594</td>
                        <td><a href="/buy">Buy</a> | <a href="/sell">Sell</a></td>

                    </tr>
                    <tr>
                        <td>JPM <br /> JPMorgan Chase &amp; Co</td>
                        <td>151.12</td>
                        <td>70</td>
                        <td>8933.86</td>
                        <td>+1660</td>
                        <td>10594</td>
                        <td><a href="/buy">Buy</a> | <a href="/sell">Sell</a></td>
                        
                    </tr>
                    <tr>
                        <td colSpan="3">Totals</td>
                        <td>1000</td>
                        <td>2000</td>
                        <td>3000</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}