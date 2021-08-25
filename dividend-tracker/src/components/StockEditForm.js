import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import InvestmentApi from "../InvestmentApi";
import UserContext from "../UserContext";
import _ from "lodash";

const StockEditForm = ({ token, setToken }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [alert, setAlert] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [action, setAction] = useState(1);

    const history = useHistory();

    const { symbol } = useParams();

    document.title = 'Modify stock'

    const stock = currentUser.stocks ? currentUser.stocks.filter((s) => s.symbol === symbol)[0] : {};
    const stockQuantities = stock && stock.transactions.length > 0 ? stock.transactions.map(s =>

        Number(s.quantity)
    ) : [];

    if (stock) {
        stock.quantity = _.sum(stockQuantities);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let updateStock = {}

            updateStock.id = stock.id

            if (!price || !quantity) {
                setAlert("Both quantity and price is needed.");
                return;
            }

            if (Number(action) === 1) {


                updateStock.price = Number(price);
                updateStock.quantity = Number(quantity);



            }

            if (Number(action) === 2) {

                if (Number(stock.quantity) - Number(quantity) < 0) {

                    setAlert(`You have ${stock.quantity} of ${stock.symbol}. Can't sell ${quantity} of it.`)
                    return;
                } else if (Number(stock.quantity) - Number(quantity) === 0) {
                    const res = await InvestmentApi.deleteStock(stock.id, token);
                    if (res.status === 'deleted') {
                        let updatedCurrentUser = await InvestmentApi.getCurrentUser(currentUser.id, token);
                        setCurrentUser(updatedCurrentUser.data);
                        history.push("/dashboard");
                        return;
                    }
                }

                updateStock.price = -Math.abs(Number(price));
                updateStock.quantity = -Math.abs(Number(quantity));
            }

            const res = await InvestmentApi.updateStock(updateStock, token);
            let updatedCurrentUser = await InvestmentApi.getCurrentUser(currentUser.id, token);
            setCurrentUser(updatedCurrentUser.data);
            history.push("/dashboard");




        } catch (err) {
            console.log(err);
            setCurrentUser(null);
            setToken(null);
            history.push("/")
        }
    }



    async function handleDelete(event) {
        event.preventDefault();
        try {
            const res = await InvestmentApi.deleteStock(stock.id, token);
            
            if (res.status === 'deleted') {
                let updatedCurrentUser = await InvestmentApi.getCurrentUser(currentUser.id, token);
                setCurrentUser(updatedCurrentUser.data);
                history.push("/dashboard");
                return;
            }
            throw Error();
        } catch (err) {
            setCurrentUser(null);
            setToken(null);
        }
    }

    return (
        <div className="row justify-content-center">

            <h2 className="text-center">Update your {symbol}</h2>

            <div className="col-md-6">
                {alert &&
                    <Alert variant="warning">
                        {alert}
                    </Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="quantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="price">
                        <Form.Label>Total Purchase Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="action">
                        <Form.Label>Select bought / sold</Form.Label>
                        <Form.Select value={action} onChange={(e) => setAction(e.target.value)}>
                            <option value="1">Bought</option>
                            <option value="2">Sold</option>
                        </Form.Select>
                    </Form.Group>



                    <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" size="lg" type="submit">
                            Update {symbol}
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleDelete}>
                            Remove {symbol}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default StockEditForm;