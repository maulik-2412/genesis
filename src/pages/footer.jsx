// import React from "react";

export default function Footer() {
  return (
    <footer className="bg-de-york text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          {/* Contact Us */}
          <div className="mb-4 lg:mb-0 text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: <a href="mailto:support@telehealth.com" className="hover:underline">support@telehealth.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+1234567890" className="hover:underline">123456789</a></p>
          </div>

          {/* About Us */}
          <div className="mb-4 lg:mb-0 text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <a href="/about" className="text-sm hover:underline">Learn more about our services</a>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-sm">&copy; {new Date().getFullYear()} Telehealth Services. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}