import { useState } from "react";
import passwordIcon from "../assets/password_icon.png";
import { Link } from "react-router-dom";
import GoogleImage from "../assets/google_icon.png";
import passwordShowIcon from "../assets/password_show.png";
import telehealthImage from "../assets/telehealth_logo.png";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


function SignIn() {
    const [customerEmail, setCustomerEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          // Optionally, you can save additional user data to Firestore or Realtime Database
          console.log("Google Sign In Success:", user);
        } catch (error) {
          console.error("Google Sign In Error:", error);
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
      
         createUserWithEmailAndPassword(auth, customerEmail, password)
          .then((userCredential) => {
            const user = userCredential.user;
             console.log("User signed up:", user);
          })
           .catch((error) => {
             console.error("Sign up error:", error);
           });
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

                            {/* <button className="w-full flex items-center justify-center border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50">
                                <img src="/path/to/github-icon.png" alt="GitHub Icon" className="mr-2" />
                                GitHub
                            </button> */}

                        </div>
                        {/* <div className="text-center text-sm text-gray-600">Or with email and password</div> */}

                        {/* Divider with lines */}
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
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                            Sign Up
                        </button>
                        </form>
                       
                       
                    </div>
                </div>
                
                {/* Left Side - Image & Content */}
                {/* <div className="bg-green-900 w-full lg:w-1/3 flex flex-col justify-center items-center text-white p-8 lg:p-12 lg:order-2"> */}
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
        </div>
    );
}

export default SignIn;

