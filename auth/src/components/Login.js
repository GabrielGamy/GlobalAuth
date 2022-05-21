import PropTypes from 'prop-types';
import style from './style';

const SignInLogo = () => {
    return (
        <svg width="48px" height="48px" viewBox="0 -1 48 48">
            <g id="Group_31" data-name="Group 31" transform="translate(-126 -465)">
                <circle id="Ellipse_5" data-name="Ellipse 5" cx="2" cy="2" r="2" transform="translate(166 495)" fill="#7d50f9" />
                <g id="Group_30" data-name="Group 30">
                    <path id="Path_36" data-name="Path 36" d="M160,508a1,1,0,0,1-1,1H129a1,1,0,0,1-1-1V487a1,1,0,0,1,1-1h30a1,1,0,0,1,1,1v4h2v-4a3,3,0,0,0-3-3h-3v-2.5a1.5,1.5,0,0,0-1.5-1.5H153v-6a9,9,0,0,0-18,0v6h-1.5a1.5,1.5,0,0,0-1.5,1.5V484h-3a3,3,0,0,0-3,3v21a3,3,0,0,0,3,3h30a3,3,0,0,0,3-3v-4h-2Zm-6-24h-4v-2h4Zm-17-10a7,7,0,0,1,14,0v6h-1.5a1.5,1.5,0,0,0-1.5,1.5V484h-8v-2.5a1.5,1.5,0,0,0-1.5-1.5H137Zm-3,8h4v2h-4Z" fill="#303033" />
                    <path id="Path_37" data-name="Path 37" d="M131,490.5V495h2v-4h4v-2h-4.5A1.5,1.5,0,0,0,131,490.5Z" fill="#303033" />
                    <path id="Path_38" data-name="Path 38" d="M168,491a6.006,6.006,0,0,0-5.91,5H148v6h2v-4h2v2h2v-2h8.09a6,6,0,1,0,5.91-7Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,168,501Z" fill="#303033" />
                </g>
            </g>
        </svg>
    )
}

const LoginPage = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            {props.title && <h1>{props.title}</h1>}
            <div style={style.box}>
                <div style={style.boxContainer}>
                    <div style={style.boxHeader}>
                        {props.appLogo && <img src={props.appLogo} alt="Application logo" />}
                        {!props.appLogo && <SignInLogo />}
                        <span>{props.appName}</span>
                    </div>
                    <h2 style={style.h2}>{props.signInText}</h2>
                    <input style={style.input} type={'email'} placeholder="Email" aria-label='Email' />
                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                        <span>{props.noAccountText} </span>
                        <button style={style.buttonLink}>{props.createAccountText}</button>
                    </div>
                    <div style={style.boxFooter}>
                        <button style={style.button}>{props.nextText}</button>
                    </div>
                </div>
            </div>
            <div style={{ ...style.box, ...style.otherOptionsBox }}>
                <div style={style.boxContainer}>
                    <h2 style={style.h2}>{props.otherOptionsText}</h2>
                    <div style={style.otherOptions}>
                        <button style={{ ...style.button, ...style.facebookBtn }}>Facebook</button>
                        <button style={{ ...style.button, ...style.googleBtn }}>Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
export default LoginPage;