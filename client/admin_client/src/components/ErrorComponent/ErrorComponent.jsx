import React from "react";

function ErrorComponent () {
  return (
    <div>
      <div className="h-screen w-screen bg-deep-purple-accent-700 flex justify-center content-center flex-wrap">
        <p className="font-sans text-9xl text-white error-text">404</p>
      </div>
      
      <div className="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
        <span className="opacity-50">Take me back</span>
        <a className="border-b" href="https://intellipark-admin.vercel.app/"> Home</a>
      </div>
    </div>
  );
}

export default ErrorComponent;
