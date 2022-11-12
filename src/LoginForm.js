import { useEffect, useState } from "react";
import "./App.css";

function LoginForm() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisable] = useState(true);

    const onSubmit = () => {
        setDisable(false);
        const data = { username: username, password: password };
        console.log(data);
        return data;
    };

    // useEffect(() => {
    //     if (username.length > 0 && password.length() > 0) setDisable(false);
    // });

    return (
        <div>
            <div style={{ marginLeft: "40%", marginTop: "20%" }}>
                <div>
                    <label>Username : </label>
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        name="username"
                        id="username-input"
                    />
                </div>
                <br />
                <div>
                    <label>Password : </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password-input"
                    />
                </div>
                <br />
                <button
                    disabled={
                        password.length > 0 && username.length > 0
                            ? false
                            : true
                    }
                    id="login-button"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
