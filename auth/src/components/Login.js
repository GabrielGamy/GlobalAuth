import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppLogo from './AppLogo';
import SignInOptions from './SigInOptions';
import style from './style';
import User from './User';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!props.firebaseConfig) {
        return <div style={{ textAlign: 'center' }}>Missing Firebase configurations.</div>
    }

    const onSubmit = () => {
        const user = new User(props.firebaseConfig);
        user.login(email, password, (response) => {
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
                    <h2 style={style.h2}>{props.signInText}</h2>
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
                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                        <span>{props.noAccountText} </span>
                        <button style={style.buttonLink} onClick={props.onCreateAccountBtnClick}>{props.createAccountText}</button>
                    </div>
                    <div style={style.boxFooter}>
                        <button
                            style={style.button}
                            onClick={onSubmit}>{props.submitText}</button>
                    </div>
                </div>
            </div>
            <SignInOptions otherOptionsText={props.otherOptionsText} />
        </div>
    )
}

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
    onCreateAccountBtnClick: PropTypes.func,
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
export default LoginPage;