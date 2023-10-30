import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-green-600 text-9xl mb-2">
        <FiCheckCircle />
      </div>
      <div>
        <p className="font-bold text-3xl">Thank You!</p>
        <p className="text-xl text-black/60">Your Submission has been sent</p>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="mt-12 border-green-600 text-green-600 border py-2 px-5 rounded-md hover:bg-green-600 hover:text-white"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ThankYou;
