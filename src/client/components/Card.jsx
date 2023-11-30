const Card = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col  w-full  md:max-w-[32rem] px-4 py-8  md:w-full bg-neutral rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100  rounded-[25px]  shadow-xl`}
    >
      {children}
    </div>
  );
};

export default Card;
