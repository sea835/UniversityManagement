import React from "react";

const Hero = () => {
  return (
    <section className="z-10 pr-20 pl-5 w-full bg-[#D6D4C8]">
      <div className="flex gap-5">
        <div className="flex flex-col w-[45%]">
          <div className="-mt-3.5 w-full">
            <div className="flex gap-5 ">
              {/* ================================================ */}
              <div className="flex flex-col w-[41%] ">
                <div className="flex relative flex-col items-start px-2.5 pb-2.5 aspect-[0.545]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/449c168c892cbcfd2e2a26b6597095331ada8cf1638ed35a0f6c0dac1676cb7d?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
                    alt=""
                    className="object-cover absolute inset-0 size-full"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27203e35cbdcbc5754bd432e1e2bdd731b62b5795045f2b22d96d7e7a9f622af?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
                    alt=""
                    className="object-contain w-full aspect-[0.56] "
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[59%]">
                <div className="grow mt-28 ">
                  <div className="flex gap-5 ">
                    <div className="flex flex-col ml-5 w-[420px] ">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7608970366acd9d397b3f0ce7f44433d7a55a328e118972885e16f8c1e734d37?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
                        alt=""
                        className="object-contain grow w-full aspect-[0.78] max-md:max-w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[55%] m">
          <div className="flex flex-col self-stretch my-auto ">
            <h2 className="text-3xl text-[#86705F] ">
              EDUCATION IS CREATING A BETTER FUTURE
            </h2>
            <p className="mt-14 mr-14 text-2xl text-[#86705F] ">
              was founded with the mission to create an ideal learning
              environment where students not only gain knowledge but also
              develop essential life skills and moral values. With a dedicated
              and experienced teaching staff
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
