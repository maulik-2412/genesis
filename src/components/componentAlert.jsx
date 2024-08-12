import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom";

function CustomAlert({ message, onClose, isSuccess }) {
    const navigate = useNavigate();
    
    const handleOkClick = () => {
        onClose();
        navigate('/'); // Navigate to home page
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`p-4 rounded-lg ${isSuccess ? "bg-salem" : "bg-red-500"} text-white max-w-sm w-full`}>
                <p>{message}</p>
                <button 
                    onClick={onOkClick} // Handle navigation here
                    className="mt-4 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100"
                >
                    OK
                </button>
            </div>
        </div>
    );
}

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired, // Update prop type
    isSuccess: PropTypes.bool.isRequired,
};

export default CustomAlert;




// import PropTypes from "prop-types"; 

// function CustomAlert({ message, onClose, isSuccess }) {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className={`p-4 rounded-lg ${isSuccess ? "bg-salem" : "bg-red-500"} text-white max-w-sm w-full`}>
//                 <p>{message}</p>
//                 <button 
//                     onClick={onClose} 
//                     className="mt-4 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100"
//                 >
//                     OK
//                 </button>
//             </div>
//         </div>
//     );
// }


// CustomAlert.propTypes = {
//     message: PropTypes.string.isRequired,
//     onClose: PropTypes.func.isRequired,
//     isSuccess: PropTypes.bool.isRequired,
// };



// export default CustomAlert;
