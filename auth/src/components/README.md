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
        nextText: 'Next'
    };

    LoginPage.propTypes = {
        title: PropTypes.string,
        appName: PropTypes.string.isRequired,
        appLogo: PropTypes.string,
        signInText: PropTypes.string,
        noAccountText: PropTypes.string,
        otherOptionsText: PropTypes.string,
        createAccountText: PropTypes.string,
        nextText: PropTypes.string
    }
```

## License

MIT