import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import InvestmentApi from "../InvestmentApi";
import UserContext from "../UserContext";



const Profile = ({ token, logout }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState(currentUser ? currentUser.firstname : "");
    const [lastName, setLastName] = useState(currentUser ? currentUser.lastname : "");
    const [email, setEmail] = useState(currentUser ? currentUser.email : "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState("");


    if (!currentUser) {
        return <Redirect to="/" />;
    }

    document.title = 'Profile';

    async function handleSubmit(event) {
        event.preventDefault();

        let updateUser = {
            updateFirstName: currentUser.firstname !== firstName ? firstName : undefined,
            updateLastName: currentUser.lastname !== lastName ? lastName : undefined,
            updateEmail: currentUser.email !== email ? email : undefined,
            updatePassword: password || undefined,
            updateConfirmPassword: confirmPassword || undefined
        };

        try {
            let updatedUser = await InvestmentApi.updateCurrentUser(updateUser, token);
            if(updatedUser){
                setFirstName(updatedUser.firstname || "");
                setLastName(updatedUser.lastname || "");
                setEmail(updatedUser.email || "");
                setPassword("");
                setConfirmPassword("");
                setAlert("Profile Updated");

                let updatedCurrentUser = await InvestmentApi.getCurrentUser(currentUser.id, token);
                setCurrentUser(updatedCurrentUser.data);
            }
        } catch (error) {
            // reset fields
            setFirstName(currentUser.firstname || "");
            setLastName(currentUser.lastname || "");
            setEmail(currentUser.email || "");
            setPassword("");
            setConfirmPassword("");
            setAlert(error.message);
        }

    }

    async function handleDelete(event) {
        event.preventDefault();

        let res = await InvestmentApi.deleteUser(currentUser.id, token);

        if(res.message === "DELETED"){
            logout();
        }
    }

    return (
        <div className="row justify-content-center">

            <h1 className="text-center">Update Profile</h1>
            <p className="lead text-center">Change only what you want and click update profile.</p>

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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <hr className="my-5"/>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" size="lg" type="submit">
                            Update Profile
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleDelete}>
                            Delete Profile
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Profile;