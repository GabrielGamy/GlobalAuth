import LoginPage from "./components/Login";
import SignUpPage from "./components/SignUp";
import { useState } from "react";

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

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
            {showLogin && <LoginPage title="Login to your account" appName="App Name" onCreateAccountBtnClick={onCreateAccountBtnClick} />}
            {showSignUp && <SignUpPage title="Create a new account" appName="App Name" onLoginBtnClick={onLoginBtnClick} />}
        </div>
    );
}

export default App;
