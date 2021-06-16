import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../hooks/UserContext';
import { loginUser } from '../utils/auth';
import { createUser, getUserContext } from '../utils/user';
import 'wired-elements';
import TextField from '@material-ui/core/TextField';
import ErrorDialog from '../components/ErrorDialog';

import { Container, Col, Row } from 'react-bootstrap';

import '../stylesheets/Login.css';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  paper: {
    background: "#795548",
    padding: "50px",
    alignItems: "center"
  },
})


const Login = (props) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState(null);

  const signup = async () => {
    console.log('Signing up...');
    var userData = null;
    try {
      userData = await createUser(formState.email, formState.username, formState.password);
    } catch(error) {
      if(error.code.includes("auth/email-already-exists")) {
        setError({ title: "Duplicate account", msg: "An account with the email you entered already exists." });
      } else if(error.code.includes("auth/invalid-email")) {
        setError({ title: "Invalid email", msg: "The email you entered is invalid." });
      } else if(error.code.includes("auth/invalid-password")) {
        setError({ title: "Invalid password", msg: "Passwords must be at least 6 characters in length." });
      } else {
        setError({ title: "There was a problem signing up!", msg: "An unknown error has occurred." });
      }
    }
    if(userData != null) {
      sessionStorage.setItem('uid', userData.uid);
      sessionStorage.setItem('refreshToken', userData.refreshToken);
      setUser(await getUserContext());
      history.push('/profile');
    } else {
      console.log('There was a problem creating the user');
    }
  }

  const login = async () => {
    console.log('Logging in...');
    var userData = null;
    try {
      userData = await loginUser(formState.email, formState.password);
    } catch(error) {
      if(error.message.includes("invalid")) {
        setError({ title: "There was a problem logging in!", msg: "The email or password you entered may be incorrect" });
      } else if(error.code.includes("auth/too-many-requests")) {
        setError({ title: "Too many login attempts!", msg: "This account has been temporarily disabled."})
      } else {
        setError({ title: "There was a problem logging in!", msg: "An unknown error has occurred. BananoTavern may be closed. Please try again later." });
      }
    }
    if(userData != null) {
      sessionStorage.setItem('uid', userData.uid);
      sessionStorage.setItem('refreshToken', userData.refreshToken);
      setUser(await getUserContext());
      history.push('/profile');
    } else {
      console.log('There was a problem logging in the user');
    }
  }
  
  const loginStatement = "Login to take a seat at the Tavern!";
  const signupStatement = "Please register before taking a seat at the Tavern =D";

  const classes = useStyles();

  return (
    <Container className="board">
      <wired-card elevation={3} fill="#795548" class="card">
      <Container class="row-center">
        <Row className="justify-content-md-center title-row">
          <h4 className="mv3 sketch-text" style={{ fontSize: 20 }}>
            {formState.login ? loginStatement : signupStatement }
          </h4>
        </Row>
        <Container className="content">
          {!formState.login && (
            <Row className="justify-content-md-center username-row">
              <Col md="4">
                <label for="idUsername" className="sketch-text">Username:</label>
              </Col>
              <Col md="auto">
                <TextField
                  value={formState.username}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      username: e.target.value
                    })
                  }
                  type="text"
                  placeholder="Username"
                  id="idUsername"
                />
              </Col>
            </Row>
          )}
          <Row className="justify-content-center email-row">
            <Col md="4">
              <label for="idEmail" className="sketch-text">Email:</label>
            </Col>
            <Col md="auto">
              <TextField
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                }
                type="text"
                placeholder="Email Address"
                id="idEmail"
              />
            </Col>
          </Row>
          <Row className="justify-content-center password-row">
            <Col md="4">
              <label for="idPass" className="sketch-text">Password:</label>
            </Col>
            <Col md="auto">
              <TextField
                value={formState.password}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value
                  })
                }
                type="password"
                placeholder="Password"
                id="idPassword"
              />
            </Col>
          </Row>
          </Container>
          <Row className="justify-content-center submit-row">
            <wired-button
              className="pointer mr2 button submitBtn"
              onClick={(e) => 
                formState.login ? login() : signup()
              }
              elevation="3"
              class="green-btn"
              id="submitBtn"
            >
              {formState.login ? 'Login' : 'Create account'}
            </wired-button>
          </Row>
          <Row className="justify-content-center switch-row">
            <wired-button
              className="pointer button"
              onClick={(e) =>
                setFormState({
                  ...formState,
                  login: !formState.login
                })
              }
              elevation="2"
              id="switchBtn"
            >
              {formState.login
                ? 'Need to create an account?'
                : 'Already have an account?'}
            </wired-button>
          </Row>
        </Container>
        {error && (
          <ErrorDialog
            title={error.title}
            open={true}
            onClose={() => setError(null)}
            error={error.msg}
          />
        )}
      </wired-card>
    </Container>
  );
};

export default Login;