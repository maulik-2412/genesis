import { useState } from "react";
import passwordIcon from "../assets/password_icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleImage from "../assets/google_icon.png";
import passwordShowIcon from "../assets/password_show.png";
import telehealthImage from "../assets/telehealth_logo.png";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import CustomAlert from "../components/componentAlert"; // Import the CustomAlert component

function SignIn() {
    const [customerEmail, setCustomerEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: "", isSuccess: false });
     
    const navigate = useNavigate(); // Initialize useNavigate
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          
          console.log("Google Sign In Success:", user);
        } catch (error) {
          console.error("Google Sign In Error:", error);
        }
      };

    //   const handleSubmit = (event) => {
    //     event.preventDefault();
      
    //      createUserWithEmailAndPassword(auth, customerEmail, password)
    //       .then((userCredential) => {
    //         const user = userCredential.user;
    //          console.log("User signed up:", user);
    //       })
    //        .catch((error) => {
    //          console.error("Sign up error:", error);
    //        });
    //   };



    const handleSubmit = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, customerEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
                setAlert({ show: true, message: "Sign-up successful!", isSuccess: true });
            })
            .catch((error) => {
                console.error("Sign up error:", error);
                setAlert({ show: true, message: "Sign-up failed. Please try again.", isSuccess: false });
            });
    };



    const handleSignUpClick = () => {
        
        if (customerEmail && firstName && lastName && password.length >= 8) {
            setAlert({ show: true, message: "Sign-up successful!", isSuccess: true });
        } else {
            setAlert({ show: true, message: "Sign-up failed. Please fill all fields correctly.", isSuccess: false });
        }
    };

    // const closeAlert = () => {
    //     setAlert({ ...alert, show: false });
    // };
    const handleOkClick = () => {
        if (alert.isSuccess) {
            navigate("/"); // Navigate to homepage on success
        } 
        else {
            window.location.reload(); 
        }
    };
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl shadow-lg">
                
                {/* Right Side - Form */}
                <div className="bg-white w-full lg:w-2/3 p-8 flex flex-col justify-center items-center lg:items-start lg:order-1">
                    <div className="max-w-md w-full space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
                        <div className="text-sm">
                            <span className="font-bold"> Have an account? </span>
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Log in now
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50">
                                <img src={GoogleImage} alt="Google Icon" className="mr-2 w-5 h-5" />
                                Google
                            </button>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="px-2">Or with email and password</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                    

                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                            />
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg w-full"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? (
                                        <img src={passwordIcon} alt="Show Password" className="h-8 w-8 rounded-full hover:bg-gray-300 active:bg-gray-400" />
                                    ) : (
                                        <img src={passwordShowIcon} alt="Hide Password" className="h-8 w-8 rounded-full hover:bg-gray-300 active:bg-gray-400"/>
                                    )}
                                </button>
                            </div>
                            <div className="text-xs text-gray-500">
                            <p>Must be at least 8 characters</p>
                            <p>Does not contain your email address</p>
                        </div>
                        <button
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                            onClick={handleSignUpClick}
                        >
                            Sign Up
                        </button>
                        </form>
                       
                       
                    </div>
                </div>
                
                {/* Left Side - Image & Content */}
                <div className="bg-green-900 w-full lg:w-2/3 flex flex-col justify-center items-center text-white p-8 lg:p-12 lg:order-2">
                    <img 
                        src={telehealthImage} 
                        alt="Background" 
                        className="object-cover h-12 w-15 lg:h-full lg:w-auto"
                    />
                    <h2 className="text-3xl font-bold mb-4">Telehealth</h2>
                    <p className="text-lg mb-8">
                    Experience the future of healthcare with our telehealth solution. Access medical consultations, manage health records, and get personalized advice from top professionals—all from the comfort of your home. Stay connected to your health, no matter where you are.
                    </p>
                </div>
            
            </div>

            {/* Custom Alert Modal */}
            {alert.show && (
                <CustomAlert
                    message={alert.message}
                    // onClose={closeAlert}
                    onOkClick={handleOkClick} 
                    isSuccess={alert.isSuccess}
                />
            )}
        </div>
    );
}

export default SignIn;



