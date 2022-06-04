import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppLogo from './AppLogo';
import SignInOptions from './SigInOptions';
import style from './style';
import User from './User';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [infoMessage, setInfoMessage] = useState("")

    if (!props.firebaseConfig) {
        return <div style={{ textAlign: 'center' }}>Missing Firebase configurations.</div>
    }

    const onSubmit = () => {
        setErrors([]);
        if (!email.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.email}`]);
        }

        if (!password.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.password}`]);
        }

        if (errors.length) {
            return;
        }

        if (email.length && password.length) {
            const user = new User(props.firebaseConfig);
            user.login(email, password, (response) => {
                if (response.error) {
                    const message = user.getCommonError(
                        response.error.message
                    );
                    setErrors(err => [...err, message]);
                } else {
                    verifyEmail(user, response.data.idToken);
                }
            })
        }
    }

    const verifyEmail = (user, idToken) => {
        user.getAccountInfo(idToken, (result) => {
            if (result.error) {
                const message = user.getCommonError(
                    result.error.message
                );
                setErrors(err => [...err, message]);
            } else {
                const data = result.data;
                let userData = null;

                if (data?.users?.length) {
                    userData = data.users.find((u) => u.emailVerified);
                    userData = userData ?? data.users[0];
                }

                if (userData?.emailVerified) {
                    completeUserLogin();
                } else {
                    user.sendEmailConfirmation(
                        idToken,
                        (response) => {
                            if (response.error) {
                                const message = user.getCommonError(
                                    response.error.message
                                );
                                setErrors(err => [...err, message]);
                            } else {
                                setInfoMessage(props.emailVerificationText);
                            }
                        }
                    );
                }
            }
        });
    };

    const completeUserLogin = () => {
        setInfoMessage(props.loginSuccessfulText);
        setTimeout(() => {
            window.location.pathname = '/'
        }, 2500);
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
                    {
                        errors.length > 0 &&
                        <ul style={style.errorList}>
                            {
                                errors.map((error, index) => {
                                    return (
                                        <li key={index} style={style.errorItem}>{error}</li>
                                    )
                                })
                            }
                        </ul>
                    }
                    {
                        infoMessage.length > 0 &&
                        <h2 style={style.infoMessage}>{infoMessage}</h2>
                    }
                    <h2 style={style.h2}>{props.signInText}</h2>
                    <input
                        style={style.input}
                        type={'email'}
                        placeholder={props.labels.email}
                        aria-label={props.labels.email}
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        style={style.input}
                        type={'password'}
                        placeholder={props.labels.password}
                        aria-label={props.labels.password}
                        value={password}
                        required={true}
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
            {
                props.showOtherSignInOptions &&
                <SignInOptions
                    firebaseConfig={props.firebaseConfig}
                    otherOptionsText={props.otherOptionsText}
                    onSuccess={() => {
                        completeUserLogin()
                    }}
                    onError={() => {
                        setErrors(err => [props.somethingWentWrong]);
                    }}
                />
            }
        </div>
    )
}

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
export default LoginPage;