import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex relative flex-col justify-center items-center px-20 py-32 w-full min-h-[801px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/040ac4abd25d4c19a668b96f2e4dc2567ff6eefc32d6b0003911050413e36da1?placeholderIfAbsent=true&apiKey=6691d1e2e6994f86a4ee60b22c84bff6"
        className="object-cover absolute inset-0 size-full"
        alt="Background"
      />
      <section className="flex overflow-hidden relative flex-col items-center px-20 pt-10 pb-32 mb-0 max-w-full rounded-3xl bg-stone-200 bg-opacity-80 min-h-[539px] w-[527px] max-md:px-5 max-md:pb-24 max-md:mb-2.5">
        <div className="text-2xl text-slate-700">Your logo</div>
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
