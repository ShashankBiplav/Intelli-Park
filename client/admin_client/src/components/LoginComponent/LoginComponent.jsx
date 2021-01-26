import React from "react";
function LoginComponent () {
  return (
    <section className="text-gray-700 body-font">
      <div className="container px-8 pt-48 pb-24 mx-auto lg:px-4">
        <div
          className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
          <div className="relative ">
            <input type="email" id="email" name="email" placeholder="Password"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0" />
          </div>
          <div className="relative ">
            <input type="email" id="email" name="email" placeholder="email"
                   className="w-full px-4 py-2 mb-4 mr-4 text-base text-blue-700 bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0" />
          </div>
          <button
            className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none">Button
          </button>
          <p className="mx-auto mt-3 text-xs "><a href="#"
                                                  className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 ">
            Sign in with Twitter
            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                 fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
            </svg>
          </a></p>
        </div>
      </div>
    </section>
);
}

export default LoginComponent;
