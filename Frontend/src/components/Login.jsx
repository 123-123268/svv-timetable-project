import React from "react";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="relative flex flex-col rounded-xl bg-transparent p-8 shadow-lg">
        <h4 className="block text-xl font-medium text-slate-800">Login</h4>
        <p className="text-slate-500 font-light">
          Nice to meet you! Enter your details to login.
        </p>

        <form className="mt-8 mb-2 w-80 max-w-5xl sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-50">
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                placeholder="Your Email"
              />
            </div>

            <div className="w-full max-w-sm min-w-50">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                placeholder="Your Password"
              />
            </div>
          </div>

          <button
            className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 text-sm text-white shadow-md hover:bg-slate-700"
            type="button"
          >
            Login
          </button>
          <p class="flex justify-center mt-6 text-sm text-slate-600">
            Do not have an account?
            <a
              href="#login"
              class="ml-1 text-sm font-semibold text-slate-700 underline"
            >
              Signup 
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
