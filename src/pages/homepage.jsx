import { useState } from "react";
import Banner from "./banner";
import ChatBotComponent from './chatbot';
import Footer from "./footer";
import PropTypes from 'prop-types';

const ImageTextBlock = ({ text, imgSrc, reverse }) => (
  <div className={`flex flex-col-reverse md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-8 md:gap-[100px]`}>
    <p className="w-full md:w-[50%] text-center md:text-left px-4">{text}</p>
    <img className="h-[300px] md:h-[500px] w-full md:w-[500px] pt-8 object-cover" src={imgSrc} alt="descriptive-alt-text" />
  </div>
);
ImageTextBlock.propTypes = {
   text: PropTypes.string.isRequired, 
   imgSrc: PropTypes.string.isRequired, 
   reverse: PropTypes.bool, 
 };
 
 // Default props for optional props
 ImageTextBlock.defaultProps = {
   reverse: false, // default value for reverse if not provided
 };
export default function HomePage() {
   const [isChatBotOpen, setChatBotOpen] = useState(false);

  const handleChatBotToggle = () => {
    setChatBotOpen(!isChatBotOpen);
  };


  return (
    <>
      <Banner />
      <div className=" bg-gray-200 flex flex-col gap-8 p-4">
        <ImageTextBlock
          text="Our telehealth service allows you to connect with healthcare providers from the comfort of your home. Whether you need a general consultation, mental health support, or a specialist referral, we're here to help."
          imgSrc="https://images.pexels.com/photos/27543727/pexels-photo-27543727/free-photo-of-a-man-in-a-white-shirt-and-mask-is-getting-his-teeth-checked.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <ImageTextBlock
          text="Our mental health services include counseling, therapy sessions, and wellness programs designed to help you manage stress, anxiety, and other mental health challenges."
          imgSrc="https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=600"
          reverse
        />
        <ImageTextBlock
          text="Need a specialist referral? We offer referrals to top specialists in various fields including cardiology, dermatology, and more. Get the expert care you need, when you need it."
          imgSrc="https://images.pexels.com/photos/5327640/pexels-photo-5327640.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </div>

      {/* Chatbot toggle button */}
     

      {/* Chatbot */}
      <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 z-50"
          onClick={handleChatBotToggle}
        >
          {isChatBotOpen ? "Close Chat" : "Open Chat"}
        </button>

        {isChatBotOpen && <ChatBotComponent onClose={handleChatBotToggle} />}
        <Footer/>
    </>
  );
}


