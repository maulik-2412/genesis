
import { useState } from "react";

function SignIn() {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full h-[60vh]">
                <div className="flex flex-col space-y-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={customerPassword}
                        onChange={(e) => setCustomerPassword(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default SignIn;
