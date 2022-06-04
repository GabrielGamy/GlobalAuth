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

## Usage (full usage example below)
- Enable email/password authentication in Firebase
- Enable Facebook and Google provider in your Firebase console page.
- Change the props for the Login and SignUp page including the logo and app name.
- Provide your FirebaseConfig in the Login and SignUp components

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
    missingFieldText: "Missing Field: ",
    emailVerificationText: 'Please click the verification link sent to your email and then Login with your credentials.',
    loginSuccessfulText: "Login completed. Redirecting to home page ...",
    somethingWentWrong: "Something went wrong. Please try again!",
    labels: {
        email: 'Enter you email',
        password: 'Password',
    },
    onCreateAccountBtnClick: () => {
        alert('You must implement this action!')
    },
    showOtherSignInOptions: true
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
    missingFieldText: PropTypes.string,
    emailVerificationText: PropTypes.string,
    loginSuccessfulText: PropTypes.string,
    somethingWentWrong: PropTypes.string,
    labels: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }),
    onCreateAccountBtnClick: PropTypes.func,
    showOtherSignInOptions: PropTypes.bool,
    firebaseConfig: PropTypes.exact({
        apiKey: PropTypes.string,
        authDomain: PropTypes.string,
        databaseURL: PropTypes.string,
        projectId: PropTypes.string,
        storageBucket: PropTypes.string,
        messagingSenderId: PropTypes.string,
        appId: PropTypes.string
    }),
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
    missingFieldText: "Missing Field: ",
    emailVerificationText: 'Please click the verification link sent to your email and then Login with your credentials.',
    signUpSuccessfulText: "Sign up completed. Redirecting to home page ...",
    somethingWentWrong: "Something went wrong. Please try again!",
    labels: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Your email',
        password: 'Password',
        confirmPassword: 'Password confirmation'
    },
    onLoginBtnClick: () => {
        alert('You must implement this action!');
    },
    showOtherSignInOptions: true
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
    missingFieldText: PropTypes.string,
    emailVerificationText: PropTypes.string,
    signUpSuccessfulText: PropTypes.string,
    somethingWentWrong: PropTypes.string,
    labels: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
    }),
    onLoginBtnClick: PropTypes.func,
    showOtherSignInOptions: PropTypes.bool,
    showFirstNameAndLastName: PropTypes.bool,
    firebaseConfig: PropTypes.exact({
        apiKey: PropTypes.string,
        authDomain: PropTypes.string,
        databaseURL: PropTypes.string,
        projectId: PropTypes.string,
        storageBucket: PropTypes.string,
        messagingSenderId: PropTypes.string,
        appId: PropTypes.string
    }),
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

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APPID,
    };

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
                    onCreateAccountBtnClick={onCreateAccountBtnClick}
                    firebaseConfig={firebaseConfig} />
            }
            {
                showSignUp &&
                <SignUpPage
                    title="Create a new account"
                    appName="App Name"
                    onLoginBtnClick={onLoginBtnClick}
                    firebaseConfig={firebaseConfig} />
            }
        </div>
    );
}

export default App;
```

## License

MIT