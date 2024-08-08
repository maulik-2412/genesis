import { useState } from "react";


function Login() {
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    
    return (
        <div className="login">
            <div className="login__form">
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
                <button className= "bg-de-york text-wheat py-2 px-4 rounded-lg hover:bg-salem">
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Login;