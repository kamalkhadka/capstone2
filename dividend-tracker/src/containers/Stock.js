import { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Redirect, useHistory, } from "react-router-dom";
import InvestmentApi from "../InvestmentApi.js";
import UserContext from "../UserContext.js";

const Stock = ({setToken, token }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [symbol, setSymbol] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [alert, setAlert] = useState("")

    const history = useHistory();

    if (!currentUser) {
        return <Redirect to="/" />;
    }



    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let stock = {};

            if (price) {
                stock.price = price;
            }

            if (quantity) {
                stock.quantity = quantity;
            }

            stock.token = token;

            const res = await InvestmentApi.addStock(symbol, currentUser.id, stock)


            if (res.status === 'Added') {
                let updatedUser = await InvestmentApi.getCurrentUser(currentUser.id, token);
                setCurrentUser(updatedUser.data);
                history.push("/dashboard")
            }

        } catch (err) {
            if (err.response.status === 404) {
                setAlert(err.response.data.errorMessage);
            }else{
                setCurrentUser(null);
                setToken(null);
                history.push("/");
            }
        }
    }

    return (
        <div className="row justify-content-center">

            <h1 className="text-center">Add Stock</h1>

            <div className="col-md-6">
                {alert &&
                    <Alert variant="warning">
                        {alert}
                    </Alert>
                }

                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="symbol">
                        <Form.Label>Symbol</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            required
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-3">
                        <Button size="lg" type="submit">
                            Add
                        </Button>
                        <Link to="/dashboard" className="btn btn-lg btn-secondary">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Stock;