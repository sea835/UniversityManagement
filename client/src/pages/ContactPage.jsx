import React from "react";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center">
        If you have any questions or need further information, please feel free
        to contact us at:
      </p>
      <p className="mt-2 text-lg text-gray-600">
        Email: support@universitymanagement.com
      </p>
      <p className="mt-2 text-lg text-gray-600">Phone: +1 (123) 456-7890</p>
    </div>
  );
};

export default ContactPage;
