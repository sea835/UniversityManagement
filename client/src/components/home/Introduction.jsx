import React from "react";

const Introduction = () => {
  return (
    <section className=" w-full bg-secondary">
      <div className="bg-[#D6D4C8] w-full h-[250px]"></div>
      <div className="flex gap-5">
        <div className="flex flex-col w-[43%]">
          <div className="flex z-10 flex-col self-stretch my-auto">
            <h2 className="self-center text-3xl font-bold text-[#86705F]">
              INTRODUCE
            </h2>
            <p className="mt-11 ml-10 text-2xl text-[#86705F] ">
              we are dedicated to providing an exceptional educational
              experience that fosters academic excellence, personal growth, and
              community engagement. Our mission is to empower students with the
              knowledge, skills, and values necessary to thrive in an
              ever-evolving world....
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[57%] ">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/366f8f109d12d24d8f7fca33c5392cfc0049208d63b7bdf34e6f06d2f4fa139f?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
            alt="Introduction visual"
            className="object-contain grow w-full aspect-[1.52] max-md:mt-10 max-md:max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Introduction;
