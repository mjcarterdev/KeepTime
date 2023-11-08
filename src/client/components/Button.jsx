const Button = ({ children, onClick, className }) => {
  return (
    <button className="btn btn-ghost text-xl text-primary-content hover:bg-accent backdrop-blur-sm px-4 py-1 bg-purple-700 bg-opacity-20 shadow-xl rounded-[25px] justify-center items-center flex">
      {children}
    </button>
  );
};

export default Button;
