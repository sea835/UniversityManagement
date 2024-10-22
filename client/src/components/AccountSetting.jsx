import React from "react";
import { useState } from "react";

function AccountSettings() {
  const [view, setView] = useState("account");
  return (
    <section className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start px-6 py-12 mx-auto w-full bg-white rounded-3xl shadow-[0px_0px_30px_rgba(170,170,170,0.16)] max-md:pl-5 max-md:mt-3.5 max-md:max-w-full">
        <div className="flex space-x-4 mt-5">
          <button
            onClick={() => setView("account")}
            className={`px-4 py-2 rounded-full ${
              view === "account"
                ? "bg-white text-primary"
                : "bg-white text-black"
            }`}
          >
            Account Setting
          </button>
          <button
            onClick={() => setView("information")}
            className={`px-4 py-2 rounded-full ${
              view === "information"
                ? "bg-white text-primary"
                : "bg-white text-black"
            }`}
          >
            Student Information
          </button>
        </div>

        {view === "account" ? (
          <div>
            <div className="mt-7 text-base font-medium text-gray-600">
              Your Profile Picture
            </div>
            <div className="flex flex-col items-center px-6 py-7 mt-3 max-w-full text-xs font-medium text-center text-gray-600 rounded-2xl border border-gray-600 border-dashed bg-slate-100 w-[118px] max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/52301881e55473b0f48f0f2804cce4ecce831c31c769d8042ea37f2629559710?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
                alt=""
                className="object-contain aspect-[0.81] w-[29px]"
              />
              <div className="mt-3">Upload your photo</div>
            </div>
            <div className="shrink-0 self-stretch mt-10 w-full h-0.5 border-2 border-gray-200 border-solid max-md:mr-1" />
            <form className="self-stretch mt-9 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col items-start w-full text-base max-md:mt-6 max-md:max-w-full">
                    <label
                      htmlFor="fullName"
                      className="font-medium leading-none text-gray-600"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value="Ngo Hoang Hai"
                      className="self-stretch px-3.5 py-5 mt-3 text-sm font-medium leading-none text-gray-600 bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <label
                      htmlFor="birth"
                      className="mt-6 font-medium leading-none text-gray-600"
                    >
                      Birth
                    </label>
                    <input
                      id="birth"
                      type="text"
                      value="19/02/2004"
                      className="self-stretch px-3.5 py-5 mt-3 text-sm font-medium leading-none text-gray-600 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <label
                      htmlFor="username"
                      className="mt-6 font-medium leading-none text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value="ngohai"
                      className="self-stretch px-3.5 py-5 mt-3 text-sm font-medium leading-none text-gray-600 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <label
                      htmlFor="password"
                      className="mt-6 font-medium leading-none text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value="ngohai"
                      className="self-stretch px-3.5 py-5 mt-3 text-sm font-medium leading-none text-gray-600 whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <div className="flex gap-8 mt-9 text-lg">
                      <button
                        type="submit"
                        className="px-7 py-3 font-bold text-white rounded-lg bg-stone-400 max-md:px-5"
                      >
                        Update Profile
                      </button>
                      <button
                        type="reset"
                        className="my-auto font-medium text-gray-600"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col w-full text-base font-medium leading-none text-gray-600 max-md:mt-6 max-md:max-w-full">
                    <label htmlFor="email" className="self-start">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value="ngohai@gmail.com"
                      className="px-4 py-5 mt-3 text-sm whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <label htmlFor="phone" className="self-start mt-6">
                      Phone number
                    </label>
                    <div className="flex flex-wrap gap-3 px-4 py-3 mt-3 text-sm whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid">
                      <div className="flex gap-px">
                        <div className="grow my-auto">+84</div>
                        <div className="shrink-0 w-px border border-gray-200 border-solid h-[30px]" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value="0768840424"
                        className="flex-auto my-auto w-[424px] max-md:max-w-full"
                      />
                    </div>

                    <label htmlFor="address" className="self-start mt-6">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value="Moon"
                      className="px-4 py-5 mt-3 text-sm whitespace-nowrap bg-white rounded-lg border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                    />

                    <label htmlFor="bio" className="self-start mt-7">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Write your Bio here e.g your hobbies, interests ETC"
                      className="px-4 py-5 mt-3 text-sm bg-white rounded-lg border border-gray-200 border-solid text-slate-400 max-md:pr-5 max-md:max-w-full"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default AccountSettings;
