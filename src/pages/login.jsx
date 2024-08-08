import { useState } from "react";


function Login() {
    const [customerName, setCustomerName] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");

    return (
        <div className="login">
            <div className="login__form">
                <input
                    type="text"
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={customerPassword}
                    onChange={(e) => setCustomerPassword(e.target.value)}
                />
                <button>Submit</button>
            </div>
        </div>
    );
}

export default Login;