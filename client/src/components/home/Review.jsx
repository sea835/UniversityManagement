import React from "react";

const ReviewItem = ({ name, content }) => (
  <div className="flex grow gap-5 text-gray-200 max-md:mt-10">
    <div className="flex shrink-0 self-start mt-1.5 h-[61px] w-[62px]" />
    <div className="flex flex-col grow shrink-0 basis-0 w-fit">
      <div className="self-start text-2xl font-bold">{name}</div>
      <div className="text-base">{content}</div>
    </div>
  </div>
);

const Review = () => {
  const reviews = [
    {
      name: "John",
      content:
        "The website has a clean and minimalist design that fits well with its target audience",
    },
    {
      name: "Emma",
      content:
        "The school offers a strong academic program with a variety of AP and honors courses",
    },
    {
      name: "Daniel",
      content:
        "The teaching staff is well-qualified and approachable, providing good support",
    },
    {
      name: "Sophia",
      content: "The school's highlights is its safe and inclusive environment",
    },
  ];

  return (
    <section className="w-full bg-tertiary">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[38%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 mt-2 max-w-full h-[441px] w-[488px] max-md:mt-10" />
        </div>
        <div className="flex flex-col ml-5 w-[62%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <h2 className="self-center text-3xl font-bold text-white">
              REVIEW
            </h2>
            <div className="flex flex-wrap gap-5 mt-14 w-full text-gray-200 max-md:mt-10 max-md:max-w-full">
              {reviews.slice(0, 2).map((review, index) => (
                <ReviewItem
                  key={index}
                  name={review.name}
                  content={review.content}
                />
              ))}
            </div>
            <div className="mt-24 max-w-full w-[755px] max-md:mt-10">
              <div className="flex gap-5 max-md:flex-col">
                {reviews.slice(2).map((review, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
                  >
                    <ReviewItem name={review.name} content={review.content} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
