import React from "react";

function Footer() {
  return (
    <footer className="mt-16 text-gray-700 bg-blue-nav-color border-t body-font">
      <div className="bg-blueGray-900">
        <div className="container flex flex-col flex-wrap px-5 py-6 lg:px-20 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center text-base ">
            <a href="https://dailysho.com" className="mr-5 text-sm text-center text-gray-200"> Powered By DAILYSHO LABS
              ©
            </a>
          </div>
          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-end">
            <p className="mr-5 text-sm text-center text-gray-200">INTELLI PARK - Making parking systems Intelligent</p>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
