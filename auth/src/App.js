import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import { useState } from "react";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APPID,
    };

    const onCreateAccountBtnClick = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }

    const onLoginBtnClick = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }

    return (
        <div >
            {
                showLogin &&
                <LoginPage
                    title="Login to your account"
                    appName="App Name"
                    onCreateAccountBtnClick={onCreateAccountBtnClick}
                    firebaseConfig={firebaseConfig} />
            }
            {
                showSignUp &&
                <SignUpPage
                    title="Create a new account"
                    appName="App Name"
                    onLoginBtnClick={onLoginBtnClick}
                    firebaseConfig={firebaseConfig} />
            }
        </div>
    );
}

export default App;
