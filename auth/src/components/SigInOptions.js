import style from './style';
import PropTypes from "prop-types";

const SignInOptions = (props) => {
    return (
        <div style={{ ...style.box, ...style.otherOptionsBox }}>
            <div style={style.boxContainer}>
                <h2 style={style.h2}>{props.otherOptionsText}</h2>
                <div style={style.otherOptions}>
                    <button style={{ ...style.button, ...style.facebookBtn }}>Facebook</button>
                    <button style={{ ...style.button, ...style.googleBtn }}>Google</button>
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