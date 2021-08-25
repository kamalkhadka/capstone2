import { useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../UserContext";
import _ from "lodash";

export default function Dashboard() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    document.title = 'Dashboard';

    const stocks = currentUser.stocks.map((stk) => {
        let stock = {};

        stock.id = stk.id;
        stock.symbol = stk.symbol;

        let prices = [];
        let quantities = [];

        if (stk.transactions.length > 0) {
            let transactions = stk.transactions;
            transactions.forEach(s => {
                prices.push(Number(s.price));
                quantities.push(Number(s.quantity));
            });
        }


        if (prices.length > 0 && quantities.length > 0) {
            stock.price = _.sum(prices);

            stock.quantity = _.sum(quantities);
        }


        return stock;
    });

    const totalPrice = stocks.map((s) => s.price)
                             .reduce(((a, p) => isNaN(p) ? a + 0 : a + Number(p)), 0);
    const totalQuantity = stocks.map((s) => s.quantity)
                            .reduce(((a, q) => isNaN(q) ? a + 0 : a + Number(q)), 0);


    return (
        <>
            <div className="text-center">
                <h1>Welcome {currentUser.firstname}</h1>
                {/* <Row className="mt-3 mb-3">
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
            </Row> */}

                <Link className="btn btn-primary mb-3" to="/stock">Add Stock</Link>
            </div>
            {
                currentUser.stocks.length > 0 ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Purchase Price</th>
                                <th>Quantity</th>
                                {/*<th>Cost</th>
                         <th>Gain/Loss</th>
                        <th>Value</th>
                        <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock) => 
                                <tr key={stock.id}>
                                    <td><Link to={'/stock/' + stock.symbol}>{stock.symbol}</Link></td>
                                    <td>${stock.price || "-"}</td>
                                    <td>{stock.quantity || "-"}</td>
                                </tr>)
                            }
                            <tr>
                                <td>Totals</td>
                                <td>${totalPrice}</td>
                                <td>{totalQuantity}</td>
                            </tr>
                        </tbody>
                    </Table>
                    :
                    <p className="lead text-center">Start by adding stock to track your portfolio.</p>
            }


        </>
    );
}