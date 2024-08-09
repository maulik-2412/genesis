import { useState } from "react";
import telehealthImage from "../assets/telehealth_logo.png";
import GoogleImage from "../assets/google_icon.png";
// import githubImage from "../assets/github_icon.png";
import { Link } from "react-router-dom";

function Login() {
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleNextClick = () => {
        setShowPassword(true);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Form */}
            <div className="bg-white p-8 w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start">
                <div className="max-w-md w-full space-y-6" style={{ fontFamily: "Arial, sans-serif" }}>
                    {/* Center the Telehealth Logo */}
                    <div className="flex justify-center">
                        <img src={telehealthImage} alt="Telehealth Logo" className="mb-2 w-15 h-auto mx-auto" />
                    </div>
                    <h2 className="text-4xl font-bold text-de-york text-center lg:text-left" style={{  fontFamily: "Segoe UI Emoji, sans" }}>Log in to your account</h2>
                    <div className="text-sm text-center lg:text-left" style={{ fontFamily: "Arial, sans-serif" }}>
                        <span>{`Don't have an account?`} </span>
                        <Link to="/signin">
                            <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                            <img src={GoogleImage} alt="Google Icon" className="mr-2 w-5 h-5" />
                            Google
                        </button>

                        {/* <button className="w-full flex items-center justify-center bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200">
                            <img src={githubImage} alt="GitHub Icon" className="mr-2 w-5 h-5" />
                            GitHub
                        </button> */}

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

            {/* Right Side - Background Color & Content */}
            <div className="bg-salem w-full lg:w-2/3 flex flex-col justify-center items-center text-white p-12 min-h-screen">
                <div className="flex flex-col justify-center items-center w-full h-full text-center lg:text-left" style={{ fontFamily: "Arial, sans-serif" }}>
                    <h2 className="text-3xl font-bold mb-4">Telehealth Solution: Your Health, Anywhere, Anytime!</h2>
                    <p className="text-lg mb-8">
                    Experience the future of healthcare with our telehealth solution. Access medical consultations, manage health records, and get personalized advice from top professionals—all from the comfort of your home. Stay connected to your health, no matter where you are.
                    </p>
                    <a href="#" className="text-white underline">View the schedule →</a>
                </div>
            </div>
        </div>
    );
}

export default Login;






