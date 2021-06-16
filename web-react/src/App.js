import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Faucet from './pages/Faucet';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import logo from './logo.svg';
import './App.scss';
import useFindUser from './hooks/useFindUser';
import { UserContext } from './hooks/UserContext';
import OverUnder from './pages/OverUnder';

import { Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');
</style>


function App() {
  const { user, setUser, isLoading } = useFindUser();
  
  return (
    <div className="center w85" style={{ backgroundColor: '#6D4C41', paddingBottom: 25, minHeight:"100%" }}>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Header />
        <Row >
          <Container className="ph3 pv1 background-gray">
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path='/game/overunder' component={OverUnder} />
                <PrivateRoute path="/faucet" component={Faucet} />
                <Route exact path="/">
                  <Redirect to="/about" />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
          </Container>
        </Row>
      </UserContext.Provider>
    </div>
  )
}

export default App;
