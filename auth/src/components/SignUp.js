import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppLogo from './AppLogo';
import SignInOptions from './SigInOptions';
import style from './style';
import User from './User';

const SignUpPage = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    if (!props.firebaseConfig) {
        return <div style={{ textAlign: 'center' }}>Missing Firebase configurations.</div>
    }

    const onSubmit = () => {
        if (password !== passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }
        const user = new User(props.firebaseConfig);
        user.signUp(email, password, (response) => {
            console.log('login: ', response);
        })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {props.title && <h1>{props.title}</h1>}
            <div style={style.box}>
                <div style={style.boxContainer}>
                    <div style={style.boxHeader}>
                        {props.appLogo && <img src={props.appLogo} alt="Application logo" />}
                        {!props.appLogo && <AppLogo />}
                        <span>{props.appName}</span>
                    </div>
                    <h2 style={style.h2}>{props.signUpText}</h2>
                    <input
                        style={style.input}
                        type={'text'}
                        placeholder={props.labels.firstName}
                        aria-label={props.labels.firstName}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />

                    <input
                        style={style.input}
                        type={'text'}
                        placeholder={props.labels.lastName}
                        aria-label={props.labels.lastName}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />

                    <input
                        style={style.input}
                        type={'email'}
                        placeholder={props.labels.email}
                        aria-label={props.labels.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input
                        style={style.input}
                        type={'password'}
                        placeholder={props.labels.password}
                        aria-label={props.labels.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <input
                        style={style.input}
                        type={'password'}
                        placeholder={props.labels.confirmPassword}
                        aria-label={props.labels.confirmPassword}
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)} />

                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                        <span>{props.haveAnAccountText} </span>
                        <button style={style.buttonLink} onClick={props.onLoginBtnClick}>{props.loginText}</button>
                    </div>
                    <div style={style.boxFooter}>
                        <button style={style.button} onClick={onSubmit}>{props.submitText}</button>
                    </div>
                </div>
            </div>
            <SignInOptions otherOptionsText={props.otherOptionsText} />
        </div>
    )
}

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
    onLoginBtnClick: PropTypes.func,
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
export default SignUpPage;