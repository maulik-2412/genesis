import { useState } from "react";

function SignIn() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");

    return (
        <div className="signup">
            <div className="signup__form">
                <input
                    type="text"
                    placeholder="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={customerPassword}
                    onChange={(e) => setCustomerPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignIn;
