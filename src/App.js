import { useState } from "react";
import "./App.css";

function App() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisable] = useState(false);

    const onSubmit = () => {
        setDisable(true);
        const data = { username: username, password: password };
        console.log(data);
        return data;
    };

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
                <button disabled={disable} id="login-button" onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default App;
