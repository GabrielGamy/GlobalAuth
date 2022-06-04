import { initializeApp } from 'firebase/app';
import {
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

const API_ENTRY_POINT = 'https://identitytoolkit.googleapis.com/v1/accounts';

class User {
    constructor(firebaseConfig) {
        this.firebaseConfig = firebaseConfig;
        initializeApp(this.firebaseConfig);
        this.firebaseAuth = getAuth();
        this.firebaseGoogleProvider = new GoogleAuthProvider();
        this.firebaseFacebookProvider = new FacebookAuthProvider();
    }

    /**
     * API REST d'authentification Firebase
     * https://firebase.google.com/docs/reference/rest/auth
     */
    authWithEmailAndPassword = (action, email, password, callback) => {
        const resquestUrl = `${API_ENTRY_POINT}:${action}?key=${this.firebaseConfig.apiKey}`;
        const requestBody = { email, password, returnSecureToken: true };

        fetch(resquestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                callback({ error: data.error, data });
            })
            .catch((error) => {
                callback({ error, data: null });
            });
    };

    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
     */
    signUp = (email, password, callback) => {
        this.authWithEmailAndPassword('signUp', email, password, callback);
    };

    /**
     * https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
     */
    login = (email, password, callback) => {
        this.authWithEmailAndPassword(
            'signInWithPassword',
            email,
            password,
            callback
        );
    };

    /**
     * API REST - Send password reset email
     * https://firebase.google.com/docs/reference/rest/auth#section-send-password-reset-email
     */
    sendPasswordResetEmail = (email, callback) => {
        const resquestUrl = `${API_ENTRY_POINT}:sendOobCode?key=${this.firebaseConfig.apiKey}`;
        const requestBody = { requestType: 'PASSWORD_RESET', email };

        fetch(resquestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                callback({ error: data.error, data });
            })
            .catch((error) => {
                callback({ error, data: null });
            });
    };

    /**
     * API REST - Send Email Confirmation
     * https://firebase.google.com/docs/reference/rest/auth#section-send-email-verification
     */
    sendEmailConfirmation = (idToken, callback) => {
        const resquestUrl = `${API_ENTRY_POINT}:sendOobCode?key=${this.firebaseConfig.apiKey}`;
        const requestBody = { requestType: 'VERIFY_EMAIL', idToken };

        fetch(resquestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                callback({ error: data.error, data });
            })
            .catch((error) => {
                callback({ error, data: null });
            });
    };

    /**
     * API REST - Get user data
     * https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
     */
    getAccountInfo = (idToken, callback) => {
        const resquestUrl = `${API_ENTRY_POINT}:lookup?key=${this.firebaseConfig.apiKey}`;
        const requestBody = { idToken };

        fetch(resquestUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                callback({ error: data.error, data });
            })
            .catch((error) => {
                callback({ error, data: null });
            });
    };

    facebookLoginHandler = (callback) => {
        signInWithPopup(this.firebaseAuth, this.firebaseFacebookProvider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(
                    result
                );
                const expiresIn = this.getTokenExpiration(user.stsTokenManager);
                callback({ success: true, result, expiresIn, credential });
            })
            .catch((error) => {
                const email = this.firebaseAuth.currentUser.email;
                const credential = FacebookAuthProvider.credentialFromError(
                    error
                );

                switch (error.code) {
                    case 'auth/account-exists-with-different-credential':
                        fetchSignInMethodsForEmail(this.firebaseAuth, email).then(
                            function (methods) {
                                const existingAccountType =
                                    methods[0] === 'password'
                                        ? 'EMAIL/PASSWORD'
                                        : 'GOOGLE';

                                callback({
                                    success: false,
                                    existingAccountType,
                                    credential,
                                    email,
                                });
                            }
                        );
                        break;
                    default:
                        callback({ success: false });
                        break;
                }
            });
    };

    googleLoginHandler = (callback) => {
        signInWithPopup(this.firebaseAuth, this.firebaseGoogleProvider)
            .then((result) => {
                const user = result.user;
                const credential = GoogleAuthProvider.credentialFromResult(
                    result
                );
                const expiresIn = this.getTokenExpiration(user.stsTokenManager)
                callback({ success: true, result, expiresIn, credential });
            })
            .catch((error) => {
                const email = this.firebaseAuth.currentUser.email;
                const credential = GoogleAuthProvider.credentialFromError(
                    error
                );

                switch (error.code) {
                    case 'auth/account-exists-with-different-credential':
                        fetchSignInMethodsForEmail(this.firebaseAuth, email).then(
                            function (methods) {
                                const existingAccountType =
                                    methods[0] === 'password'
                                        ? 'EMAIL/PASSWORD'
                                        : 'FACEBOOK';

                                callback({
                                    success: false,
                                    existingAccountType,
                                    credential,
                                    email,
                                });
                            }
                        );
                        break;
                    default:
                        callback({ success: false });
                        break;
                }
            });
    };

    getTokenExpiration = (data) => {
        var expiresIn = new Date();
        if (data.expirationTime) {
            expiresIn = new Date(data.expirationTime);
        } else if (data.expiresIn) {
            expiresIn.setSeconds(
                expiresIn.getSeconds() + parseInt(data.expiresIn)
            );
        } else {
            expiresIn.setSeconds(expiresIn.getSeconds() + 3600); // expire in 1 hour
        }
        return expiresIn;
    };

    getCommonError = (code) => {
        switch (code) {
            case 'INVALID_EMAIL':
                return "Bad email format.";
            case 'MISSING_EMAIL':
                return "Invalid email address.";
            case 'EMAIL_EXISTS':
                return "Invalid email address.";
            case 'OPERATION_NOT_ALLOWED':
                return 'Operation not supported by the server (OPERATION_NOT_ALLOWED)';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return "Too many attemps. Please try later!";
            case 'EMAIL_NOT_FOUND':
                return "Invalid email address or deleted.";
            case 'INVALID_PASSWORD':
                return "Invalid email/password.";
            case 'MISSING_PASSWORD':
                return "Invalid email/password.";
            case 'USER_DISABLED':
                return "Invalid email address or deactivated.";
            default:
                return `An error occured. Please try later!.`;
        }
    };
}

export default User;
