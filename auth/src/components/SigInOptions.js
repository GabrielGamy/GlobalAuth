import style from './style';
import PropTypes from "prop-types";
import User from './User';

const SignInOptions = (props) => {
    const user = new User(props.firebaseConfig);
    const authProviderHandler = (response) => {
        const { success, existingAccountType, email } = response;
        if (success) {
            props.onSuccess();
        } else {
            props.onError(email, existingAccountType);
        }
    };
    return (
        <div style={{ ...style.box, ...style.otherOptionsBox }}>
            <div style={style.boxContainer}>
                <h2 style={style.h2}>{props.otherOptionsText}</h2>
                <div style={style.otherOptions}>
                    <button
                        style={{ ...style.button, ...style.facebookBtn }}
                        onClick={() => user.facebookLoginHandler(authProviderHandler)}>Facebook</button>
                    <button
                        style={{ ...style.button, ...style.googleBtn }}
                        onClick={() => user.googleLoginHandler(authProviderHandler)}>Google</button>
                </div>
            </div>
        </div>
    )
}

SignInOptions.defaultProps = {
    otherOptionsText: 'Other Sign-in options'
};

SignInOptions.propTypes = {
    otherOptionsText: PropTypes.string
}
export default SignInOptions;