import { Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import NotFound from "./NotFound";

const Routes = ({ setToken }) => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/signup">
                <Signup setToken={setToken}/>
            </Route>
            <Route exact path="/login">
                <Login setToken={setToken} />
            </Route>
            {/* <Route exact path="/investment/:symbol">
                <Symbol />
            </Route> */}
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Routes;