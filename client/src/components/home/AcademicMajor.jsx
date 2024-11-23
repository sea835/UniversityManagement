const AcademicMajor = () => {
  const majors = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3b52bfb428c2b3ba5fa39c8cdebb3719043eadea08790b9a7f8572590048eb03?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Software Engineering",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8534e3e9d93d91b16eec3b254348f4126ce28ac2b3e7c0e85d7d32815089178b?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Cyber Security",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/630dc9cd466d5be39063b70df5499d38f366a661c99fd28983bc19344ebd987d?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Web Design",
    },
  ];

  return (
    <section className="flex flex-col items-center px-20 pt-16 w-full bg-secondary relative h-[350px]">
      <div className="flex z-10 flex-col mb-0 w-full max-w-[1000px] absolute">
        <div className="flex flex-col self-end mr-11 w-full ">
          <h2 className="self-end px-16 py-1.5 text-3xl font-bold bg-white text-[#86705F] max-md:px-5">
            ACADEMIC MAJOR
          </h2>
          <p className="mt-5 text-2xl text-right text-[#86705F] max-md:max-w-full">
            Throughout the program, students will engage with a range of core
            subjects, while also having the flexibility to explore elective
            courses that match their personal interests and career goals
          </p>
        </div>
        <div className="mt-12">
          <div className="flex gap-5 max-md:flex-col">
            {majors.map((major, index) => (
              <div
                key={index}
                className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              >
                <img
                  loading="lazy"
                  src={major.image}
                  alt={major.title}
                  className="object-contain grow w-full aspect-[1.27] max-md:mt-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicMajor;
