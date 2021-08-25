import { Route, Switch } from "react-router-dom";
import Symbol from "./containers/Symbol";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import Stock from "./containers/Stock";
import NotFound from "./NotFound";

const Routes = ({ token, setToken, logout }) => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/signup">
                <Signup setToken={setToken} />
            </Route>
            <Route exact path="/login">
                <Login setToken={setToken} />
            </Route>
            <Route exact path="/stock">
                <Stock setToken={setToken}  token={token}/>
            </Route>
            <Route exact path="/stock/:symbol">
                <Symbol token={token} setToken={setToken}/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard token={token} />
            </Route>
            <Route exact path="/profile">
                <Profile  token={token} logout={logout}/>
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Routes;