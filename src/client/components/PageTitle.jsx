const PageTitle = ({ title, className }) => {
  return (
    <h1
      className={`w-full pt-5 pb-2 text-3xl font-bold text-center underline md:text-4xl lg:text-5xl decoration-primary decoration-3 ${className}`}
    >
      {title}
    </h1>
  );
};

export default PageTitle;
