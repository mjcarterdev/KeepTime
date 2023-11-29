const Card = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col  w-full  md:max-w-[32rem] mx-2 px-4 py-8 max-w-max90 md:w-full bg-neutral rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100  rounded-10px ${className} shadow-xl`}
    >
      {children}
    </div>
  );
};

export default Card;
