# react-firebase-authentication
This module is a generic authentication system for websites using React.js and Firebase.

## Installation
```sh
npm i @gabrielgamy/react-firebase-authentication
```

## Features

- Allows you to authenticate with email/password, Facebook and Google accounts
- Ssupports email verification by sending a validation code
- Supports an additional security layer by sending an OTP code by email
- Allows apps to remember the logged-in user for a period of one hour

## Technologies

- [Reactjs] - Reactjs Framework
- [Firebase] - Firebase authentication

## Usage

### Login
```
    <LoginPage title="Login to your account" appName="App Name" />
```

### Login Props
```
LoginPage.defaultProps = {
    signInText: "Sign In",
    noAccountText: 'No Account?',
    otherOptionsText: 'Other Sign-in options',
    createAccountText: 'Create a new account',
    submitText: 'Submit',
    labels: {
        email: 'Enter you email',
        password: 'Password',
    },
    onCreateAccountBtnClick: () => {
        alert('You must implement this action!')
    }
};

LoginPage.propTypes = {
    title: PropTypes.string,
    appName: PropTypes.string.isRequired,
    appLogo: PropTypes.string,
    signInText: PropTypes.string,
    noAccountText: PropTypes.string,
    otherOptionsText: PropTypes.string,
    createAccountText: PropTypes.string,
    submitText: PropTypes.string,
    labels: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onCreateAccountBtnClick: PropTypes.func
}
```

### SignUp Props

```
SignUpPage.defaultProps = {
    signUpText: "Sign Up",
    otherOptionsText: 'Other Sign-in options',
    submitText: 'Submit',
    haveAnAccountText: "Already have an account?",
    loginText: "Login",
    labels: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Enter you email',
        password: 'Password',
        confirmPassword: 'Password confirmation'
    },
    onLoginBtnClick: () => {
        alert('You must implement this action!');
    }
};

SignUpPage.propTypes = {
    title: PropTypes.string,
    appName: PropTypes.string.isRequired,
    appLogo: PropTypes.string,
    signUpText: PropTypes.string,
    otherOptionsText: PropTypes.string,
    haveAnAccountText: PropTypes.string,
    loginText: PropTypes.string,
    submitText: PropTypes.string,
    labels: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }),
    onLoginBtnClick: PropTypes.func
}
```

### How to use the login and sign-up components?

```
import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import { useState } from "react";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const onCreateAccountBtnClick = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }

    const onLoginBtnClick = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }

    return (
        <div >
            {
                showLogin &&
                <LoginPage
                    title="Login to your account"
                    appName="App Name"
                    onCreateAccountBtnClick={onCreateAccountBtnClick} />
            }
            {
                showSignUp &&
                <SignUpPage
                    title="Create a new account"
                    appName="App Name"
                    onLoginBtnClick={onLoginBtnClick} />
            }
        </div>
    );
}

export default App;
```

## License

MIT