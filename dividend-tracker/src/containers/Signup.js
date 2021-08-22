import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import InvestmentApi from "../InvestmentApi";


const Signup = ({ setToken }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");

    const history = useHistory();

    document.title = "Signup";

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const res = await InvestmentApi.signup({ firstName, lastName, email, password });
            setToken(res.data.token);

            history.push("/");
        } catch(err){
            setAlert("Something went wrong");
        }


    }

    return (
        <div className="row justify-content-center">

            <h1 className="text-center">Signup</h1>

            <div className="col-md-6">

                {alert &&
                    <Alert variant="warning">
                        {alert}
                    </Alert>
                }


                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-3">
                        <Button size="lg" type="submit">
                            Signup
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Signup;