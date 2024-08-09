import { useState } from "react";
// import telehealthImage from "../assets";
// import GoogleImage from "../assets/";
// import githubImage from "../assets/"

function Login() {
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleNextClick = () => {
        setShowPassword(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            {/* Left Side - Form */}
            <div className="bg-white p-8 w-1/2 flex flex-col justify-center items-start">
                <div className="max-w-md w-full space-y-6">
                    <img src="" alt="Telehealth Logo" className="mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">Log in to your account</h2>
                    <div className="text-sm">
                        <span>Don't have an account? </span>
                        <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                            <img src="/path/to/google-icon.png" alt="Google Icon" className="mr-2" />
                            Google
                        </button>
                        <button className="w-full flex items-center justify-center bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                            <img src="/path/to/github-icon.png" alt="GitHub Icon" className="mr-2" />
                            GitHub
                        </button>
                    </div>


                    {/* Divider with lines */}
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="px-2">Or with email and password</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                        {showPassword && (
                            <input
                                type="password"
                                placeholder="Password"
                                value={customerPassword}
                                onChange={(e) => setCustomerPassword(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                            />
                        )}
                    </div>
                    {!showPassword ? (
                        <button
                            onClick={handleNextClick}
                            className="w-full bg-de-york text-white py-2 px-4 rounded-lg hover:bg-salem"
                        >
                            Next
                        </button>
                    ) : (
                        <>
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Right Side - Image & Content */}
            <div className="bg-green-800 w-1/2 flex flex-col justify-center items-center text-white p-12">
                <h2 className="text-3xl font-bold mb-4">MongoDB.local is coming to a city near you!</h2>
                <p className="text-lg mb-8">
                    Enjoy technical deep-dives, one-on-one expert advice, and product tutorials to elevate your skills.
                    Enjoy a 50% discount with code WEB50.
                </p>
                <a href="#" className="text-white underline">View the schedule →</a>
            </div>
        </div>
    );
}

export default Login;






// import { useState } from "react";


// function Login() {
//     const [customerEmail, setCustomerEmail] = useState("");
//     const [customerPassword, setCustomerPassword] = useState("");
    
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//                <div className="flex flex-col space-y-4 mb-4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Password"
//                     value={customerPassword}
//                     onChange={(e) => setCustomerPassword(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg"
//                 />
//                 </div>
//                 <button className= "w-full bg-de-york text-white py-2 px-4 rounded-lg hover:bg-salem">
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Login;