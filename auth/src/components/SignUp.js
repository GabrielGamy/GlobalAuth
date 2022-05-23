import PropTypes from 'prop-types';
import AppLogo from './AppLogo';
import SignInOptions from './SigInOptions';
import style from './style';

const SignUpPage = (props) => {
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
                    <input style={style.input} type={'text'} placeholder={props.labels.firstName} aria-label={props.labels.firstName} />
                    <input style={style.input} type={'text'} placeholder={props.labels.lastName} aria-label={props.labels.lastName} />
                    <input style={style.input} type={'email'} placeholder={props.labels.email} aria-label={props.labels.email} />
                    <input style={style.input} type={'password'} placeholder={props.labels.password} aria-label={props.labels.password} />
                    <input style={style.input} type={'password'} placeholder={props.labels.confirmPassword} aria-label={props.labels.confirmPassword} />
                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                        <span>{props.haveAnAccountText} </span>
                        <button style={style.buttonLink} onClick={props.onLoginBtnClick}>{props.loginText}</button>
                    </div>
                    <div style={style.boxFooter}>
                        <button style={style.button}>{props.submitText}</button>
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
    onLoginBtnClick: PropTypes.func
}
export default SignUpPage;