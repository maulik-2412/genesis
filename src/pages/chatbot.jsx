import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { FaTimes } from "react-icons/fa"; // Import the close icon

// Define the chatbot steps
const steps = [
  {
    id: "1",
    message: "Welcome to our Telehealth Service! How can I assist you today?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: "book-appointment", label: "Book an Appointment", trigger: "3" },
      { value: "services", label: "Types of Services Offered", trigger: "4" },
      { value: "contact-doctor", label: "Contact a Doctor", trigger: "5" },
    ],
  },
  {
    id: "3",
    message: "To book an appointment, please visit our appointment page or call us at (123) 456-7890.",
    trigger: "end",
  },
  {
    id: "4",
    message: "We offer various services including General Consultations, Mental Health Support, and Specialist Referrals.",
    trigger: "end",
  },
  {
    id: "5",
    message: "You can contact a doctor directly through our chat or schedule a video call.",
    trigger: "end",
  },
  {
    id: "end",
    message: "Is there anything else I can assist you with?",
    trigger: "more-help",
  },
  {
    id: "more-help",
    options: [
      { value: "yes", label: "Yes", trigger: "2" },
      { value: "no", label: "No, thanks", end: true },
    ],
  },
];

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial, Helvetica, sans-serif",
  headerBgColor: "#00bfff",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#00bfff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

export default function ChatBotComponent({ onClose }) {
  return (
    <div className="relative h-[450px] w-[320px] bg-white border rounded-lg shadow-lg">
      <ThemeProvider theme={theme}>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <ChatBot
              steps={steps}
              style={{ width: "100%", height: "100%" }}
              contentStyle={{ height: "100%" }} // Adjust content height
            />
          </div>
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-50"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes className="text-red-500" size={20} />
          </button>
        </div>
      </ThemeProvider>
    </div>
  );
}
