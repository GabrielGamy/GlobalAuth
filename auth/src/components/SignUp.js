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
    const [errors, setErrors] = useState([]);
    const [infoMessage, setInfoMessage] = useState("")

    if (!props.firebaseConfig) {
        return <div style={{ textAlign: 'center' }}>Missing Firebase configurations.</div>
    }

    const onSubmit = () => {
        setErrors([]);

        if (props.showFirstNameAndLastName && !firstName.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.firstName}`]);
        }

        if (props.showFirstNameAndLastName && !lastName.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.lastName}`]);
        }

        if (!email.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.email}`]);
        }

        if (!password.length) {
            setErrors(err => [...err, `${props.missingFieldText} ${props.labels.password}`]);
        }

        if (password !== passwordConfirmation) {
            setErrors(err => [...err, `Error: ${props.labels.password} / ${props.labels.confirmPassword}`]);
        }

        if (errors.length) {
            return;
        }

        if (email.length && password.length && password === passwordConfirmation) {
            const user = new User(props.firebaseConfig);
            user.signUp(email, password, (response) => {
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
        setInfoMessage(props.signUpSuccessfulText);
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
                    <h2 style={style.h2}>{props.signUpText}</h2>

                    {
                        props.showFirstNameAndLastName &&
                        <input
                            style={style.input}
                            type={'text'}
                            placeholder={props.labels.firstName}
                            aria-label={props.labels.firstName}
                            value={firstName}
                            required={true}
                            onChange={(e) => setFirstName(e.target.value)} />
                    }

                    {
                        props.showFirstNameAndLastName &&
                        <input
                            style={style.input}
                            type={'text'}
                            placeholder={props.labels.lastName}
                            aria-label={props.labels.lastName}
                            value={lastName}
                            required={true}
                            onChange={(e) => setLastName(e.target.value)} />
                    }

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

                    <input
                        style={style.input}
                        type={'password'}
                        placeholder={props.labels.confirmPassword}
                        aria-label={props.labels.confirmPassword}
                        value={passwordConfirmation}
                        required={true}
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
export default SignUpPage;