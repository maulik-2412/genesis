import { useState } from "react";


function Login() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
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
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={customerPassword}
                    onChange={(e) => setCustomerPassword(e.target.value)}
                />
                <button bg-salem text-wheat py-2 px-4 rounded-lg hover:bg-blue-600>Submit</button>
            </div>
        </div>
    );
}

export default Login;