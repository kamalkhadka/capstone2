import { useState } from "react";
import { Button, Form } from "react-bootstrap";


const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    document.title = firstName ? `Welcome ${firstName}` : 'Profile';


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

    }

    return (
        <div className="row justify-content-center">

            <h1 className="text-center">Update Profile</h1>

            <div className="col-md-6">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            autoFocus type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            autoFocus type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            autoFocus type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" size="lg">
                            Update Profile
                        </Button>
                        <Button variant="secondary" size="lg">
                            Delete Profile
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Profile;