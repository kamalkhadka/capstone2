import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import InvestmentApi from "../InvestmentApi";

const Login = ({ setToken })  => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    document.title = "Login";

    const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await InvestmentApi.login({ email, password });
            setToken(res.token);
            history.push("/dashboard");

            // return <Redirect to="/dashboard" />
        } catch (err) {
            setAlert(err.message);
            setEmail("");
            setPassword("");
        }
    }

    return (
        <div className="Login row justify-content-center">

            <h1 className="text-center">Login</h1>

            <div className="col-md-6">
                {alert &&
                    <Alert variant="warning">
                        {alert}
                    </Alert>
                }

                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className="mt-3 block" size="lg" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;