import React from "react";

const ServiceItem = ({ imageSrc, title }) => (
  <div className="flex flex-col grow px-8 py-14 w-full text-xl bg-white text-stone-500">
    <img
      loading="lazy"
      src={imageSrc}
      alt={title}
      className="object-contain self-center h-[80px]"
    />
    <div className="self-center mt-6">{title}</div>
  </div>
);

const ConsultingServices = () => {
  const services = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/63fde05cbce0a17062d22907e8b4f4e6bc9d5af67bc41523f02b980380d04370?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Consulting on choosing industry",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/077f748114a954f5a8a94b2b8be3f45965d34be0e86f581f119d5160f24bfd35?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Scholarship program",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8a9bcbd44cecbf315c17e8a876d83fb72a5f5cc03a7aa8c91817b9ce024898da?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6",
      title: "Admission procedures",
    },
  ];

  return (
    <section className="flex flex-col px-5 pt-20 pb-32 w-full bg-secondary">
      <div className="flex flex-wrap gap-6 items-center self-center max-w-full text-3xl font-bold text-stone-400 w-[906px]">
        <div className="shrink-0 self-stretch my-auto max-w-full h-px border border-black border-solid w-[252px]" />
        <h2 className="grow shrink self-stretch w-[297px]">
          CONSULTING SERVICES
        </h2>
        <div className="shrink-0 self-stretch my-auto max-w-full h-px border border-black border-solid w-[252px]" />
      </div>
      <div className="pt-20">
        <div className="flex gap-5 max-md:flex-col">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            >
              <ServiceItem imageSrc={service.imageSrc} title={service.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultingServices;
